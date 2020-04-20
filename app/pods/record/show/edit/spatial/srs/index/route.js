import Route from '@ember/routing/route';
import { computed, defineProperty } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  setupController(controller, model) {
    this._super(controller, model);

    defineProperty(controller, 'refresh', computed(
      'model.referenceSystemParameterSet.{projection,geodetic,verticalDatum}',
      'model.referenceSystemWKT',
      function () {
        return (new Date).getTime();
      }), )
  },

});
