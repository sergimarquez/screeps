let roleUpgrader = {
  /** @param {Creep} creep **/
  run: function(creep) {
    //check if it's upgrading or not
    if (creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
    }
    if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
    }

    //if upgrading, go to room controller
    //else go to source 0 to collect energy
    if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {
          visualizePathStyle: { stroke: "#ff0000" }
        });
      }
    } else {
      let sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {
          visualizePathStyle: { stroke: "#ff0000" }
        });
      }
    }
  }
};

module.exports = roleUpgrader;
