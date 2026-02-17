import { z, type ZodTypeAny } from "zod";

/**
 * Converts a Zod schema to a Mongoose schema definition object.
 * Supports: string, number, boolean, date, enum, array, object, optional, default.
 */
export function zodToMongoose(schema: ZodTypeAny): Record<string, unknown> {
  const unwrapped = unwrapSchema(schema);

  if (unwrapped instanceof z.ZodObject) {
    const shape = unwrapped.shape;
    const definition: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(shape)) {
      definition[key] = zodFieldToMongoose(value as ZodTypeAny);
    }

    return definition;
  }

  throw new Error("zodToMongoose expects a ZodObject at the top level");
}

function unwrapSchema(schema: ZodTypeAny): ZodTypeAny {
  if (schema instanceof z.ZodOptional || schema instanceof z.ZodNullable) {
    return unwrapSchema(schema.unwrap());
  }
  if (schema instanceof z.ZodDefault) {
    return unwrapSchema(schema.removeDefault());
  }
  if (schema instanceof z.ZodEffects) {
    return unwrapSchema(schema.innerType());
  }
  return schema;
}

function zodFieldToMongoose(field: ZodTypeAny): unknown {
  let isOptional = false;
  let defaultValue: unknown = undefined;
  let hasDefault = false;
  let current: ZodTypeAny = field;

  // Peel off wrappers (optional, default, effects)
  while (true) {
    if (current instanceof z.ZodOptional) {
      isOptional = true;
      current = current.unwrap();
    } else if (current instanceof z.ZodNullable) {
      isOptional = true;
      current = current.unwrap();
    } else if (current instanceof z.ZodDefault) {
      hasDefault = true;
      defaultValue = current._def.defaultValue();
      current = current.removeDefault();
    } else if (current instanceof z.ZodEffects) {
      current = current.innerType();
    } else {
      break;
    }
  }

  // --- Leaf types ---

  if (current instanceof z.ZodString) {
    const result: Record<string, unknown> = { type: "String" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checks: any[] = current._def.checks || [];
    const hasMin = checks.some((c) => c.kind === "min");
    if (hasMin && !isOptional) result.required = true;
    if (hasDefault) result.default = defaultValue;
    return result;
  }

  if (current instanceof z.ZodNumber) {
    const result: Record<string, unknown> = { type: "Number" };
    if (!isOptional) result.required = true;
    if (hasDefault) result.default = defaultValue;
    return result;
  }

  if (current instanceof z.ZodBoolean) {
    const result: Record<string, unknown> = { type: "Boolean" };
    if (hasDefault) result.default = defaultValue;
    return result;
  }

  if (current instanceof z.ZodDate) {
    const result: Record<string, unknown> = { type: "Date" };
    if (!isOptional) result.required = true;
    return result;
  }

  if (current instanceof z.ZodEnum) {
    const result: Record<string, unknown> = {
      type: "String",
      enum: current.options as string[],
    };
    if (!isOptional) result.required = true;
    if (hasDefault) result.default = defaultValue;
    return result;
  }

  if (current instanceof z.ZodArray) {
    const inner = zodFieldToMongoose(current.element);
    return [inner];
  }

  if (current instanceof z.ZodObject) {
    const shape = current.shape;
    const subDef: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(shape)) {
      subDef[key] = zodFieldToMongoose(value as ZodTypeAny);
    }
    return subDef;
  }

  // Union / or — take first variant (common for email().optional().or(z.literal("")))
  if (current instanceof z.ZodUnion) {
    const options = current.options as ZodTypeAny[];
    if (options.length > 0) {
      return zodFieldToMongoose(options[0]);
    }
  }

  if (current instanceof z.ZodLiteral) {
    return { type: "String" };
  }

  // Fallback
  return { type: "Mixed" };
}
