import { Users } from './models/index';

async function main() {
  await Users.sync({ alter: true });

  process.exit();
}

main();
