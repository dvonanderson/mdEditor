import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
//import { isEmpty } from 'mdeditor/utils/md-object';

export default Component.extend({

  projection: alias('model.projection'),
  geodetic: alias('model.geodetic'),
  vertical: alias('model.verticalDatum'),
  allEmpty: computed('projection', 'geodetic', 'vertical', function () {
    return !this.projection && !this.geodetic && !this.vertical
  }),

  actions: {
    // addProjection(){
    //   debugger;
    //   this.set('projection', {});
    // }
  }
});
