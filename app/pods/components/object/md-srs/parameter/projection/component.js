import Component from '@ember/component';
import { get, getWithDefault, set } from '@ember/object';
import { once } from '@ember/runloop';
import { alias } from '@ember/object/computed';
import { decamelize } from '@ember/string';
import { ucWords } from 'mdeditor/helpers/uc-words';
import Projection from 'mdjson-schemas/resources/js/projection';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  'identifier': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    })
  ]
});

const params = {
  gridZone: 'string',
  standardParallel1: 'number',
  standardParallel2: 'number',
  longitudeOfCentralMeridian: 'number',
  latitudeOfProjectionOrigin: 'number',
  falseEasting: 'number',
  falseNorthing: 'number',
  falseEastingNorthingUnits: 'string',
  scaleFactorAtEquator: 'number',
  heightOfProspectivePointAboveSurface: 'number',
  longitudeOfProjectionCenter: 'number',
  latitudeOfProjectionCenter: 'number',
  scaleFactorAtCenterLine: 'number',
  scaleFactorAtCentralMeridian: 'number',
  straightVerticalLongitudeFromPole: 'number',
  scaleFactorAtProjectionOrigin: 'number',
  azimuthAngle: 'number',
  azimuthMeasurePointLongitude: 'number',
  landsatNumber: 'number',
  landsatPath: 'number',
}

export default Component.extend(Validations, {
  init() {
    this.params = Object.keys(params).map(p => {
      return {
        property: p,
        label: ucWords([decamelize(p).replace(/_/g,
          ' ')], { force: false }),
        type: params[p],
        description: get(Projection, `properties.${p}.description`)
      }
    });

    this._super(...arguments);
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let model = getWithDefault(this, 'model', {}) || {};

    once(this, function () {
      set(model, 'projectionIdentifier', getWithDefault(model,
        'projectionIdentifier', {}));
      set(model, 'gridIdentifier', getWithDefault(model,
        'gridIdentifier', {}));
      set(model, 'local', getWithDefault(model, 'local', {}));
      set(model, 'obliqueLinePoint', getWithDefault(model,
        'obliqueLinePoint', [{}, {}]));
    });
  },

  identifier: alias('model.projectionIdentifier.identifier'),
  localDescription: alias('model.local.description'),
  localGeoreference: alias('model.local.georeference'),
});
