let roleHarvester = {
  /** @param {Creep} creep **/
  run: function(creep) {
    // If creep is not carrying energy to max capacity
    if (creep.carry.energy < creep.carryCapacity) {
      // Go to energy source 1
      let sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1]);
      }
    } // If creep is carrying
    else {
      // find closest spawn or structure which is not full
      var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: s => s.energy < s.energyCapacity
      });

      //then try top move towards it
      if (structure != undefined) {
        if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(structure, {
            visualizePathStyle: { stroke: "#ffffff" }
          });
        }
      }
    }
  }
};

module.exports = roleHarvester;
