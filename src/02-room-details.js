/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

/**
 * getRoomByDinosaurName()
 * ---------------------
 * Return the name of the room where the given dinosaur can be found. If the dinosaur does not exist in the `dinosaurs` list or cannot be found in any room, return an error message that says so.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The name of the room where the dinosaur can be found. Alternatively, an error message.
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Tyrannosaurus");
 *  //> "Roberts Room"
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Pterodactyl");
 *  //> "Dinosaur with name 'Pterodactyl' cannot be found."
 */
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let dinosaurId;
  // Find dinosaur with the name of 'dinosaurName' 
  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].name === dinosaurName) {
      dinosaurId = dinosaurs[i].dinosaurId;
      break;
    }
  }

  // No dinosaur found
  if (!dinosaurId) {
    return "Dinosaur with name '" + dinosaurName + "' cannot be found.";
  }

  let roomName

  // Get room where the dinosaur is found
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].dinosaurs.includes(dinosaurId)) {
      roomName = rooms[i].name;
    }
  }

  // Dinosaur not found in any room
  if (!roomName) {
    return "Dinosaur with name '" + dinosaurName + "' cannot be found in any rooms."
  }

  return roomName;
}

/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room. If a room ID cannot be found, an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} id - A unique room identifier.
 * @returns {string|string[]} An array of room names, or an error message.
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "aIA6tevTne");
 *  //> ["Ticket Center"]
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "A6QaYdyKra");
 *  //> [
      "Entrance Room",
      "Coat Check Room",
      "Ellis Family Hall",
      "Kit Hopkins Education Wing"
    ]
 */
function getConnectedRoomNamesById(rooms, id) {
  // Check whether room with roomId of 'id' exists
  let room = isCorrectRoom(rooms, id);
  if (!room) {
    return "Room with ID of '" + id + "' could not be found.";
  }

  // Check whether each connected room is correct
  for (let i = 0; i < room.connectsTo.length; i++) {
    if (!isCorrectRoom(rooms, room.connectsTo[i])) {
      return "Room with ID of '" + room.connectsTo[i] + "' could not be found.";
    }
  }

  // Get the name of every connected room
  let connectedRoomNames = getConnectedRoomNames(rooms, room.connectsTo);

  return connectedRoomNames;
}

/**
 * isCorrectRoom()
 * -----------------
 * Returns a room object if it exists, where the room object has a roomId corresponding to the value 'id'. Otherwise, it returns a boolean value of 'false'.
 * 
 * @param {Object[]} rooms - An array of room objects.
 * @param {string} id - A unique room identifier.
 * @returns {Object|boolean} Object if room exists, false otherwise.
 */
function isCorrectRoom(rooms, id) {
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].roomId === id) {
      // The room exists.
      return rooms[i];
    }
  }

  // Room does not exist.
  return false;
}
/**
 * getConnectedRoomNames()
 * -----------------------
 * Returns am array of strings, where each string is the name of a room whose roomId is provided in the parameter roomIds.
 * 
 * @param {Object[]} rooms - An array of room objects.
 * @param {string[]} roomIds - An array of unique room identifiers.
 * @returns {string} An array of room names.
 */
function getConnectedRoomNames(rooms, roomIds) {
  let roomNames = [];
  for (let i = 0; i < rooms.length; i++) {
    if (roomIds.includes(rooms[i].roomId)) {
      roomNames.push(rooms[i].name);
    }
  }

  return roomNames;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
