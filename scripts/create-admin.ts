// Script pour créer un utilisateur admin
// Exécuter avec: npx ts-node --esm scripts/create-admin.ts

import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const password = "@Xel"; // Changez ce mot de passe

async function main() {
  const hash = await bcrypt.hash(password, 12);

  console.log("\n=== Créer un utilisateur admin dans Supabase ===\n");
  console.log("Allez dans Supabase > Table Editor > User");
  console.log("Cliquez sur 'Insert row' et utilisez ces valeurs:\n");
  console.log("id:", uuidv4());
  console.log("email: admin@example.com");
  console.log("password:", hash);
  console.log("name: Admin");
  console.log("createdAt:", new Date().toISOString());
  console.log("updatedAt:", new Date().toISOString());
  console.log("\n");
}

main();
