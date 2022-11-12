async function main() {
  console.log('to be continued');
}

main().then(() =>
  process.exit().catch((err) => {
    console.error(err);
    process.exit(1);
  })
);
