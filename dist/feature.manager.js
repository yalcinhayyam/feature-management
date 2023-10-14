"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureManager = void 0;
class FeatureManager {
    constructor(features = []) {
        this.features = features;
    }
    add(feature) {
        this.features.push(feature);
    }
    get(keyword) {
        return this.features.find(item => item.keyword === keyword);
    }
    remove(feature) {
        const index = this.features.findIndex(item => item.keyword === feature.keyword);
        this.features.splice(index, 1);
    }
    update(feature) {
        const index = this.features.findIndex(item => item.keyword === feature.keyword);
        this.features.splice(index, 1, feature);
    }
}
exports.FeatureManager = FeatureManager;
