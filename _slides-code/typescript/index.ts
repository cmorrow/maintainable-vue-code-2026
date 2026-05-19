export {};

// =============================================================================
// Don't use `any`
// =============================================================================
// `any` opts out of TypeScript entirely — no autocomplete, no error checking,
// no type inference. It silently lets bugs through that TypeScript would
// otherwise catch before your code ever runs.

// ─── The Pet type ─────────────────────────────────────────────────────────────

interface Pet {
  name: string;
  species: "dog" | "cat" | "rabbit";
  age: number;
  vaccinated: boolean;
}

// ─── ✅ Properly typed ────────────────────────────────────────────────────────
// TypeScript knows the shape of `pet`, so it infers types on every property
// and flags mistakes immediately.

function describePet(pet: Pet): string {
  // ✅ pet.species is inferred as "dog" | "cat" | "rabbit"
  // ✅ pet.age is inferred as number
  return `${pet.name} is a ${pet.age}-year-old ${pet.species}`;
}

const myPet: Pet = {
  name: "Biscuit",
  species: "dog",
  age: 3,
  vaccinated: true,
};

// ✅ TypeScript catches these mistakes at compile time:
// @ts-expect-error — species must be "dog" | "cat" | "rabbit", not a string
const badSpecies: Pet = {
  name: "Rex",
  species: "hamster",
  age: 1,
  vaccinated: false,
};

// @ts-expect-error — age must be a number, not a string
const badAge: Pet = {
  name: "Rex",
  species: "dog",
  age: "three",
  vaccinated: false,
};

// ─── ❌ Typed as `any` ────────────────────────────────────────────────────────
// `any` removes all of the above. TypeScript trusts you completely — even when
// you're wrong. Errors that would have been caught at compile time become
// runtime surprises instead.

function describePetAny(pet: any): string {
  // ❌ No autocomplete — you have to remember every property name yourself
  // ❌ No error if you mistype: pet.naem, pet.speces — TypeScript says nothing
  // ❌ The return value of pet.age.toUpperCase() isn't a number operation,
  //    but TypeScript won't warn you — it crashes at runtime
  return `${pet.naem} is a ${pet.age.toUpperCase()}-year-old ${pet.speces}`;
}

// ❌ None of these mistakes produce a TypeScript error when typed as `any`
const anyPet: any = {
  name: "Biscuit",
  species: "dog",
  age: 3,
  vaccinated: true,
};

describePetAny(anyPet); // ❌ Runs, crashes at runtime
describePetAny("not a pet at all"); // ❌ TypeScript doesn't complain
describePetAny(42); // ❌ TypeScript doesn't complain
describePetAny(null); // ❌ TypeScript doesn't complain

// ─── ✅ Use `unknown` when the type genuinely isn't known ─────────────────────
// `unknown` forces you to narrow the type before using it — keeping safety
// without requiring you to lie about what you know.

function describePetUnknown(pet: unknown): string {
  if (
    typeof pet === "object" &&
    pet !== null &&
    "name" in pet &&
    "species" in pet &&
    "age" in pet
  ) {
    const { name, species, age } = pet as Pet;
    return `${name} is a ${age}-year-old ${species}`;
  }
  return "Not a valid pet";
}
