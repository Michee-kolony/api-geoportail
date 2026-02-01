const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
type: { type: String, required: true },
point: { type: String, required: true  },
date: { type: String, required: true},
message: {type: String, required: true},
agentid: {type: String, required: true},
createdAt: {type: Date, default : Date.now}
});

module.exports = mongoose.model('Mission', missionSchema);
