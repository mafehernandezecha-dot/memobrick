/* Admin command line:
     node src/cli.js migrate
     node src/cli.js create-user --email you@x.com --name "Ana" --role admin --password '...'
     node src/cli.js create-api-key --name "MemoBrick Studio"
*/
import { migrate, closePool } from "./db.js";
import { createUser, createApiKey } from "./auth.js";

const [cmd, ...rest] = process.argv.slice(2);
const args = {};
for (let i = 0; i < rest.length; i += 2) args[rest[i].replace(/^--/, "")] = rest[i + 1];

try {
  await migrate();
  if (cmd === "create-user"){
    const u = await createUser({ email: args.email, name: args.name, role: args.role || "admin", password: args.password });
    console.log("created", u.email, "as", u.role);
  } else if (cmd === "create-api-key"){
    console.log("Studio API key (shown once):", await createApiKey(args.name || "MemoBrick Studio"));
  } else if (cmd !== "migrate"){
    console.log("commands: migrate | create-user | create-api-key");
  }
} catch (e){
  console.error(e.message); process.exitCode = 1;
} finally { await closePool(); }
