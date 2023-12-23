

class Helper {
    static reportError(error) {
        return {
            name: error.name,
            message: error.message
        };
    }

    static async idVerification(Model, id, bool = true) {
        if (typeof id == 'undefined') {
            return this.response.status(403).json({ name: 'Verification Error', message: `${Model.collection.collectionName} id is required for this action.`});
        }
        const model = await Model.findById(id);
        if (model == null) {
            return this.response.status(403).json({ name: 'Validation Error', message: `${Model.collection.collectionName} id is incorrect.`});
        }
        return bool ? true : model;
    }
}

module.exports = Helper