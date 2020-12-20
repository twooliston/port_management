export function unload(ship_stack, storage_stack, train_stack) {
  while (canMoveContainers(ship_stack, storage_stack, train_stack)) {
    let storageAndTrainStacks = unloadStorageToTrain(
      storage_stack,
      train_stack
    );
    storage_stack = storageAndTrainStacks.storage_stack;
    train_stack = storageAndTrainStacks.train_stack;
    let shipAndStorageStacks = unloadShipToStorage(ship_stack, storage_stack);
    ship_stack = shipAndStorageStacks.ship_stack;
    storage_stack = shipAndStorageStacks.storage_stack;
  }
  return { ship_stack, storage_stack, train_stack };
}

function canMoveContainers(ship_stack, storage_stack, train_stack) {
  return (
    (storage_stack.length !== 5 && ship_stack.length) ||
    (train_stack.length !== 3 && storage_stack.length)
  );
}

function unloadStorageToTrain(storage_stack, train_stack) {
  if (train_stack.length !== 3 && storage_stack.length) {
    train_stack.push("X");
    storage_stack.pop();
    unloadStorageToTrain(storage_stack, train_stack);
  }
  return { storage_stack, train_stack };
}

function unloadShipToStorage(ship_stack, storage_stack) {
  if (storage_stack.length !== 5 && ship_stack.length) {
    storage_stack.push("X");
    ship_stack.pop();
    unloadShipToStorage(ship_stack, storage_stack);
  }
  return { ship_stack, storage_stack };
}
