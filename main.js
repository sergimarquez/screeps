const roleHarvester = require("role.harvester");
const roleUpgrader = require("role.upgrader");
const roleBuilder = require("role.builder");

module.exports.loop = function() {
  // delete memory entry if creep is dead
  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
    }
  }

  // loop every creep and run their scripts
  for (let name in Game.creeps) {
    let creep = Game.creeps[name];
    if (creep.memory.role == "harvester") {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == "upgrader") {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == "builder") {
      roleBuilder.run(creep);
    }
  }

  // check the number of harvesters and builders
  let harvesters = _.sum(
    Game.creeps,
    creep => creep.memory.role == "harvester"
  );
  let builders = _.sum(Game.creeps, creep => creep.memory.role == "builder");

  // automate creeps creation, making sure that there's enough harvesters,
  // builders, and if true, then try spawn a new upgrader
  if (harvesters < 5) {
    let newName = "Harvester" + Game.time;
    Game.spawns["Spawn1"].spawnCreep(
      [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
      newName,
      {
        memory: { role: "harvester" }
      }
    );
  } else if (builders < 1) {
    let newName = "Builder" + Game.time;
    Game.spawns["Spawn1"].spawnCreep(
      [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
      newName,
      {
        memory: { role: "builder" }
      }
    );
  } else {
    let newName = "Upgrader" + Game.time;
    Game.spawns["Spawn1"].spawnCreep(
      [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE],
      newName,
      {
        memory: { role: "upgrader" }
      }
    );
  }
};
