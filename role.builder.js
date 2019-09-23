var roleBuilder = {
  /** @param {Creep} creep **/
  run: function(creep) {
    // check if creep is ready to build or not
    if (creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
    }
    if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
    }

    // if ready to build, find closest construction
    // else go to energy source 1
    if (creep.memory.building) {
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        if (creep.build(targets[1]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[1], {
            visualizePathStyle: { stroke: "#ffaa00" }
          });
        }
      }
    } else {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1], { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  }
};

module.exports = roleBuilder;
