import { watchEffect, getCurrentInstance } from "vue";

function getParentName(instance: ReturnType<typeof getCurrentInstance>): string {
  const parent = instance?.parent?.type;
  if (typeof parent === "object" && parent !== null) {
    const p = parent as Record<string, unknown>;
    if (typeof p.name === "string") return p.name;
    if (typeof p.__name === "string") return p.__name;
  }
  return "unknown";
}

export function usePropsValidation(
  validators: Record<string, () => string | null>,
) {
  const instance = getCurrentInstance();

  watchEffect(() => {
    const parentName = getParentName(instance);
    for (const [prop, validate] of Object.entries(validators)) {
      const error = validate();
      if (error) {
        console.warn(
          `[PropValidation] "${prop}": ${error} (used in <${parentName}>)`,
        );
      }
    }
  });
}
