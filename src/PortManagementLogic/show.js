var port_view = [
  ["_", "A", "_", "A", "", "", "", "", "", "", ""],
  ["", "|", " ", "|", "", "", "", "", "", "", ""],
  [" ", "|", " ", "|", "", "", "", "", "", "", ""],
  [" ", "|", " ", "|", "", "", "", "", "", "", ""],
  [" ", "|", " ", "|", "", "", "", "", "", "", ""],
  [" ", "|", " ", "|", " ", " ", " ", "", "D", "", "i"],
  [" ", "A", "_", "A", "-", "-", "-", ":", "%", "%", "%"],
];

// refresh the port view with the new information and output the results
export function show(ship_stack, storage_stack, train_stack) {
  resetPortView();
  let port_view = addContainersToPortView(
    ship_stack,
    storage_stack,
    train_stack
  );
  return port_view;
}

function resetPortView() {
  // reset train
  for (let j = 4; j <= 6; j++) {
    port_view[5][j] = " ";
  }

  // reset storgae
  for (let i = 1; i <= 5; i++) {
    port_view[i][2] = " ";
  }

  // reset ship
  for (let i = 2; i <= 5; i++) {
    port_view[i][0] = " ";
  }
}

function addContainersToPortView(ship_stack, storage_stack, train_stack) {
  // add ship's containers
  if (ship_stack.length) {
    port_view[6][0] = "V";
    for (let i = 5; i > 5 - ship_stack.length; i--) {
      port_view[i][0] = "X";
    }
  }

  // add storage's containers
  if (storage_stack.length) {
    for (let i = 5; i > 5 - storage_stack.length; i--) {
      port_view[i][2] = "X";
    }
  }

  // add train's containers
  if (train_stack.length) {
    for (let j = 4; j < 4 + train_stack.length; j++) {
      port_view[5][j] = "X";
    }
  }
  return port_view;
}
