const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        group: { type: String, default: "default", lowercase: true, trim: true },
        name: { type: String, required: true, lowercase: true, trim: true },
        version: { type: Number, default: 1, min: 1 },
        folder: { type: String, reqired: true },
        mode: { type: String, default: "rhythm" },
        anyPianoKey: { type: Boolean, default: false },
        enableSoundFlag: { type: Boolean, default: false },
        footnote: { type: Boolean, default: false },
        timeLimitInSeconds: { type: Number, default: 0 },
        logFlag: { type: Boolean, default: true },
        successesForSkip: { type: Number, default: 0 },
        variable: [
            {
                name: String,
                values: []
            }
        ],
        flow: {
            required: true,
            default: [],
            type: [
                {
                    type: {
                        type: String,
                        required: true,
                        //enum: ["cue", "end", "feedback", "instruction", "playing", "rest", "video"]
                    },
                    textContent: { type: [String], default: undefined },
                    interactivePiano: { type: [], default: undefined },
                    pictureFileName: { type: [String], default: undefined },
                    midiFileName: { type: [], default: undefined },
                    videoFileName: { type: [String], default: undefined },
                    numberRepetition: { type: Number, default: undefined },
                    followedBy: { type: Boolean, default: undefined },
                    anyPianoKey: { type: Boolean, default: undefined },
                    enableSoundFlag: { type: Boolean, default: undefined },
                    timeoutInSeconds: { type: Number, default: undefined },
                    playingMode: { type: String, default: undefined },
                    footnote: { type: Boolean, default: undefined },
                    logFlag: { type: Boolean, default: undefined },
                    successesForSkip: { type: Number, default: undefined }
                }
            ]
        }
    },
    {
        strict: false,
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
);

// Indexes cration
schema.index({ "group": 1, "name": 1, "version": 1 }, { unique: true });

// Middleeare
schema.pre("save", function () {
    this.name = this.name.toLowerCase().trim();
    this.group = this.graphLookup.toLowerCase().trim();
});

// Options for Object/JSON tranformations
const transformationOprtions = {
    virtuals: true,
    transform: function (doc, ret) {
        if (ret.flow) ret.flow.forEach(element => { delete element._id });
        delete ret.id;
        delete ret.__v;
    }
}

schema.set('toObject', transformationOprtions);
schema.set('toJSON', transformationOprtions);

// Static methods
schema.statics.getListAllHeaders = function () {
    return this.find({}, 'group name version folder createdAt updatedAt')
        .sort({ group: 1, name: 1, version: 1 });
};

// Instance methods
schema.methods.getDefinition = async function () {
    let experimentDefinition = {};
    Object.assign(experimentDefinition, this.toObject());
    delete experimentDefinition.createdAt;
    delete experimentDefinition.updatedAt;
    return experimentDefinition;
};

schema.methods.updateDescription = async function (description) {
    const oldDescription = await this.getDefinition();
    for (var attribute in oldDescription)
        if (oldDescription.hasOwnProperty(attribute))
            delete this[attribute];
    Object.assign(this, description);
    return this;
};

const model = mongoose.model('Experiment', schema);

module.exports = {
    schema: schema,
    model: model
}