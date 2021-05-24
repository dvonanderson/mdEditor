'use strict';

define("mdeditor/tests/acceptance/pods/components/layout/md-breadcrumb-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Acceptance | pods/components/md breadcrumb', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('visiting /record/new', async function (assert) {
      assert.expect(4);
      await (0, _testHelpers.visit)('/record/new');
      assert.ok((0, _testHelpers.currentURL)().match(/record\/new\/[a-z0-9]+/));
      const listItems = (0, _testHelpers.findAll)('ol.breadcrumb li');
      const linkItems = (0, _testHelpers.findAll)('ol.breadcrumb li a');
      const hasRecordInallList = listItems[0].textContent.indexOf('Record') >= 0;
      const hasNewTextInallList = listItems[1].textContent.indexOf('New') >= 0; // const doesNotHaveRecordInLinkList = linkItems.indexOf('Record') === -1;
      // const doesNotHaveNewInLinkList = linkItems.indexOf('New') === -1;

      assert.ok(hasRecordInallList, 'renders the right inferred name');
      assert.ok(hasNewTextInallList, 'renders the right inferred name');
      assert.equal(linkItems.length, 0, 'no links rendered'); // assert.ok(doesNotHaveRecordInLinkList, 'renders the right inferred name');
      // assert.ok(doesNotHaveNewInLinkList, 'renders the right inferred name');
    });
  });
});
define("mdeditor/tests/acceptance/pods/contact/copy-test", ["qunit", "@ember/test-helpers", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_qunit, _testHelpers, _emberQunit, _createContact) {
  "use strict";

  (0, _qunit.module)('Acceptance | pods/contact copy', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('create and copy record', async function (assert) {
      assert.expect(2);
      var store = this.owner.lookup('service:store'); //make sure there's at least one record visible

      var contact = store.createRecord('contact', (0, _createContact.default)(1)[0]); //await visit('/contacts/');
      //await click('button.md-button-.btn-danger');

      await (0, _testHelpers.visit)('/contact/' + contact.id); //await settled();

      assert.equal((0, _testHelpers.currentURL)(), '/contact/' + contact.id);
      await (0, _testHelpers.click)('.md-crud-buttons .btn-info');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[1].value, 'Copy of Contact0', 'created copy'); //change route to prevent error during teardown

      await (0, _testHelpers.visit)('/');
    });
  });
});
define("mdeditor/tests/acceptance/pods/contact/new-test", ["qunit", "@ember/test-helpers", "ember-qunit"], function (_qunit, _testHelpers, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Acceptance | pods/contact/new', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('visiting /pods/contact/new', async function (assert) {
      await (0, _testHelpers.visit)('/contact/new');
      assert.ok((0, _testHelpers.currentURL)().match(/contact\/new\/[a-z0-9]+/)); //change route to prevent error during teardown

      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new contact initial page conditions', async function (assert) {
      assert.expect(5);
      await (0, _testHelpers.visit)('/contact/new');
      assert.dom('.toggle-off').exists();
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value.length, 36);
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[1].value, '');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[2].value, '');
      assert.dom('button.md-form-save').isDisabled(); //change route to prevent error during teardown

      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new contact individual', async function (assert) {
      assert.expect(2);
      await (0, _testHelpers.visit)('/contact/new');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[1], 'Individual Name');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[2], '');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[1].value, 'Individual Name');
      assert.dom('button.md-form-save').isNotDisabled(); //change route to prevent error during teardown

      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new contact organization', async function (assert) {
      assert.expect(4);
      await (0, _testHelpers.visit)('/contact/new');
      await (0, _testHelpers.click)('.x-toggle-btn');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[1], 'Organization Name');
      assert.dom('.toggle-on').exists();
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value.length, 36);
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[1].value, 'Organization Name');
      assert.dom('button.md-form-save').isNotDisabled(); //change route to prevent error during teardown

      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new contact missing contact ID', async function (assert) {
      assert.expect(1);
      await (0, _testHelpers.visit)('/contact/new');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[0], '');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[1], 'Individual Name');
      assert.dom('button.md-form-save').isDisabled(); //change route to prevent error during teardown

      await (0, _testHelpers.visit)('/');
    });
  });
});
define("mdeditor/tests/acceptance/pods/contacts/contacts-test", ["qunit", "@ember/test-helpers", "ember-qunit"], function (_qunit, _testHelpers, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Acceptance | pods/contacts', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('visiting /contacts', async function (assert) {
      await (0, _testHelpers.visit)('/contacts');
      assert.equal((0, _testHelpers.currentURL)(), '/contacts');
    });
    (0, _qunit.test)('delete should display a confirm', async function (assert) {
      assert.expect(1);
      var store = this.owner.lookup('service:store'); //make sure there's at least one record visible

      store.createRecord('contact');
      await (0, _testHelpers.visit)('/contacts');
      await (0, _testHelpers.click)('button.md-button-confirm.btn-danger');
      assert.equal((0, _testHelpers.find)('button.md-button-confirm.btn-danger').innerText.trim(), 'Confirm');
    });
  });
});
define("mdeditor/tests/acceptance/pods/dictionary/copy-test", ["qunit", "@ember/test-helpers", "ember-qunit", "mdeditor/tests/helpers/create-dictionary"], function (_qunit, _testHelpers, _emberQunit, _createDictionary) {
  "use strict";

  (0, _qunit.module)('Acceptance | pods/dictionary copy', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('create and copy record', async function (assert) {
      assert.expect(2);
      var store = this.owner.lookup('service:store'); //make sure there's at least one record visible

      var dictionary = store.createRecord('dictionary', (0, _createDictionary.createDictionary)(1)[0]); //await visit('/contacts/');
      //await click('button.md-button-.btn-danger');

      await (0, _testHelpers.visit)('/dictionary/' + dictionary.id); //await settled();

      assert.equal((0, _testHelpers.currentURL)(), '/dictionary/' + dictionary.id);
      await (0, _testHelpers.click)('.md-crud-buttons .btn-info');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value, 'Copy of My Dictionary0', 'created copy'); //change route to prevent error during teardown

      await (0, _testHelpers.visit)('/');
    });
  });
});
define("mdeditor/tests/acceptance/pods/dictionary/new-test", ["qunit", "@ember/test-helpers", "ember-qunit", "ember-power-select/test-support"], function (_qunit, _testHelpers, _emberQunit, _testSupport) {
  "use strict";

  (0, _qunit.module)('Acceptance | pods/dictionary/new', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('visiting /pods/dictionary/new', async function (assert) {
      await (0, _testHelpers.visit)('/dictionary/new');
      assert.ok((0, _testHelpers.currentURL)().match(/dictionary\/new\/[a-z0-9]+/)); //change route to prevent error during teardown

      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new dictionary initial page conditions', async function (assert) {
      assert.expect(4);
      await (0, _testHelpers.visit)('/dictionary/new');
      assert.dom('.md-input-input input').hasValue('');
      assert.equal((0, _testHelpers.find)('.md-select').innerText, '');
      assert.dom('button.md-form-save').isDisabled();
      assert.dom('.md-error.ember-tooltip-target').exists({
        count: 2
      }); //change route to prevent error during teardown

      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new dictionary completed form', async function (assert) {
      assert.expect(4);
      await (0, _testHelpers.visit)('/dictionary/new');
      await (0, _testHelpers.fillIn)('.md-input-input input', 'Dictionary Name');
      await (0, _testSupport.selectChoose)('div.md-select', 'aggregate');
      assert.dom('.md-input-input input').hasValue('Dictionary Name');
      assert.equal((0, _testHelpers.find)('div.md-select .select-value').innerText, 'aggregate');
      assert.dom('button.md-form-save').isNotDisabled();
      assert.dom('.md-error.ember-tooltip-target').doesNotExist(); //change route to prevent error during teardown

      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new dictionary missing dictionary name', async function (assert) {
      assert.expect(2);
      await (0, _testHelpers.visit)('/dictionary/new');
      await (0, _testSupport.selectChoose)('div.md-select', 'aggregate');
      assert.dom('button.md-form-save').isDisabled();
      assert.dom('.md-error.ember-tooltip-target').exists({
        count: 1
      }); //change route to prevent error during teardown

      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new dictionary missing data resource type', async function (assert) {
      assert.expect(2);
      await (0, _testHelpers.visit)('/dictionary/new');
      await (0, _testHelpers.fillIn)('.md-input-input input', 'Dictionary Name');
      assert.dom('button.md-form-save').isDisabled();
      assert.dom('.md-error.ember-tooltip-target').exists({
        count: 1
      }); //change route to prevent error during teardown

      await (0, _testHelpers.visit)('/');
    });
  });
});
define("mdeditor/tests/acceptance/pods/record/copy-test", ["qunit", "@ember/test-helpers", "ember-qunit", "mdeditor/tests/helpers/create-record"], function (_qunit, _testHelpers, _emberQunit, _createRecord) {
  "use strict";

  (0, _qunit.module)('Acceptance | pods/record copy', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('create and copy record', async function (assert) {
      assert.expect(2);
      var store = this.owner.lookup('service:store'); //make sure there's at least one record visible

      var record = store.createRecord('record', (0, _createRecord.default)(1)[0]); //await visit('/records/');
      //await click('button.md-button-.btn-danger');

      await (0, _testHelpers.visit)('/record/' + record.id); //await settled();

      assert.equal((0, _testHelpers.currentURL)(), '/record/' + record.id);
      await (0, _testHelpers.click)('.md-crud-buttons .btn-info');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value, 'Copy of My Record0', 'created copy'); //change route to prevent error during teardown

      await (0, _testHelpers.visit)('/');
    });
  });
});
define("mdeditor/tests/acceptance/pods/record/new-test", ["qunit", "@ember/test-helpers", "ember-qunit", "ember-power-select/test-support"], function (_qunit, _testHelpers, _emberQunit, _testSupport) {
  "use strict";

  (0, _qunit.module)('Acceptance | pods/record/new', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('visiting /pods/record/new', async function (assert) {
      await (0, _testHelpers.visit)('/record/new');
      assert.ok((0, _testHelpers.currentURL)().match(/record\/new\/[a-z0-9]+/));
    });
    (0, _qunit.test)('test new metadata record initial page conditions', async function (assert) {
      assert.expect(3);
      await (0, _testHelpers.visit)('/record/new');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value, '');
      assert.equal((0, _testHelpers.find)('.md-select').innerText.trim(), 'Choose type of resource');
      assert.dom('button.md-form-save').isDisabled(); //change route to prevent error during teardown

      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new metadata record completed form', async function (assert) {
      assert.expect(3);
      await (0, _testHelpers.visit)('/record/new');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[0], 'Record Title');
      await (0, _testSupport.selectChoose)('.md-select', 'attribute');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value, 'Record Title');
      assert.equal((0, _testHelpers.find)('div.md-select .select-value').innerText, 'attribute');
      assert.dom('button.md-form-save').isNotDisabled(); //change route to prevent error during teardown

      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new metadata record missing record title', async function (assert) {
      assert.expect(1);
      await (0, _testHelpers.visit)('/record/new');
      await (0, _testSupport.selectChoose)('.md-select', 'attribute');
      assert.dom('button.md-form-save').isDisabled(); //change route to prevent error during teardown

      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new metadata record missing data record type (scope)', async function (assert) {
      assert.expect(2);
      await (0, _testHelpers.visit)('/record/new');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[1], 'Record Title');
      assert.dom('button.md-form-save').isDisabled();
      assert.dom('.md-error').exists({
        count: 1
      }); //change route to prevent error during teardown

      await (0, _testHelpers.visit)('/');
    });
  });
});
define("mdeditor/tests/acceptance/pods/record/show/edit/spatial/raster-test", ["qunit", "@ember/test-helpers", "ember-qunit", "mdeditor/tests/helpers/create-record", "mdeditor/tests/helpers/create-contact", "mdeditor/tests/helpers/md-helpers"], function (_qunit, _testHelpers, _emberQunit, _createRecord, _createContact, _mdHelpers) {
  "use strict";

  (0, _qunit.module)('Acceptance | raster view', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    hooks.afterEach(function () {
      (0, _mdHelpers.lsClean)();
    });
    (0, _qunit.skip)('visiting /raster', async function (assert) {
      let json = (0, _createRecord.createRecord)(1)[0];
      let contact = (0, _createContact.default)(2);
      json.json.contact = contact;
      let coverageDescription = (0, _createRecord.createCoverageDescription)(1);
      json.json.metadata.resourceInfo.coverageDescription = coverageDescription;
      let store = this.owner.lookup('service:store');
      let record = store.createRecord('record', json);
      record.save();
      await (0, _testHelpers.visit)(`/record/${record.id}/edit`);
      assert.equal((0, _testHelpers.currentURL)(), `/record/${record.id}/edit`);
    }); // need to figure out why the Promise is being rejected when asserting the currentURL
    // is equal to asyny helper
    // skip('visiting raster page', async function(assert) {
    //     let store = this.owner.lookup('service:store');
    //     let json = createRecord(1)[0];
    //     let coverageDescription = createCoverageDescription(1);
    //     json.json.metadata.resourceInfo.coverageDescription = coverageDescription;
    //     let record = store.createRecord('record', json);
    //     record.save();
    //   await visit(`/record/${record.id}/edit`);
    //   assert.equal(currentURL(), `/record/${record.id}/edit`);
    // });
  });
});
define("mdeditor/tests/helpers/create-citation", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createCitation;

  function createCitation(total) {
    const citations = [];

    for (let i = 0; i < total; i++) {
      const citation = Ember.Object.create({
        title: 'title' + i,
        alternateTitle: ['alternateTitle0', 'alternateTitle1'],
        date: [{
          date: '2016-10-13',
          dateType: 'dateType'
        }, {
          date: '2016-10-22',
          dateType: 'dateType'
        }],
        edition: 'edition',
        responsibleParty: [{
          role: 'role',
          roleExtent: [{
            temporalExtent: [{
              timePeriod: {
                startDateTime: '2016-10-24T11:10:15.2-10:00'
              }
            }]
          }],
          party: [{
            contactId: 'individualId0'
          }]
        }, {
          role: 'role',
          roleExtent: [{
            temporalExtent: [{
              timePeriod: {
                startDateTime: '2016-10-24T11:10:15.2-10:00'
              }
            }]
          }],
          party: [{
            contactId: 'individualId0'
          }]
        }],
        presentationForm: ['presentationForm0', 'presentationForm1'],
        identifier: [{
          identifier: 'identifier' + i,
          authority: {
            title: 'title'
          }
        }, {
          identifier: 'identifier-' + i
        }],
        series: {
          seriesName: 'seriesName'
        },
        otherCitationDetails: ['otherCitationDetails0', 'otherCitationDetails1'],
        onlineResource: [{
          uri: 'http://adiwg.org'
        }, {
          uri: 'http://mdeditor.org'
        }],
        graphic: [{
          fileName: 'fileName'
        }, {
          fileName: 'fileName'
        }]
      });
      citations.push(citation);
    }

    return citations;
  }
});
define("mdeditor/tests/helpers/create-contact", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createContact;

  function createContact(total) {
    const contacts = [];

    for (let i = 0; i < total; i++) {
      const contact = Ember.Object.create({
        json: {
          contactId: i,
          isOrganization: false,
          name: 'Contact' + i,
          positionName: null,
          phoneBook: [],
          address: {},
          onlineResource: [],
          contactInstructions: null
        },
        title: 'Contact' + i,
        icon: 'user',
        contactId: i
      });
      contacts.push(contact);
    }

    return contacts;
  }
});
define("mdeditor/tests/helpers/create-dictionary", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.createDictionary = _exports.createAttribute = _exports.createEntity = _exports.createDomain = void 0;

  let createDictionary = function (total) {
    const dictionaries = [];

    for (let i = 0; i < total; i++) {
      const dictionary = Ember.Object.create({
        json: {
          dataDictionary: {
            citation: {
              title: 'My Dictionary' + i,
              date: [{
                date: new Date().toISOString(),
                dateType: 'creation'
              }]
            },
            description: 'Data dictionary.' + i,
            subject: [],
            responsibleParty: {},
            domain: createDomain(2),
            entity: createEntity(2)
          }
        },
        title: 'My Dictionary' + i,
        icon: 'book'
      });
      dictionaries.push(dictionary);
    }

    return dictionaries;
  };

  _exports.createDictionary = createDictionary;

  let createDomain = function (total) {
    const domains = [];

    for (let i = 0; i < total; i++) {
      const domain = Ember.Object.create({
        domainId: 'domainId' + i,
        commonName: 'commonName' + i,
        codeName: 'codeName' + i,
        description: 'description' + i,
        domainItem: [{
          name: 'name' + i,
          value: 'value' + i,
          definition: 'definition' + i
        }]
      });
      domains.push(domain);
    }

    return domains;
  };

  _exports.createDomain = createDomain;

  let createAttribute = function (total) {
    const attributes = [];

    for (let i = 0; i < total; i++) {
      const attribute = Ember.Object.create({
        commonName: 'attributeCommonName' + i,
        codeName: 'attributeCodeName0-' + i,
        alias: ['attributeAlias0-' + i],
        definition: 'definition' + i,
        dataType: 'dataType' + i,
        allowNull: true,
        units: 'units' + i,
        domainId: 'domainId' + i,
        minValue: '0' + i,
        maxValue: '99'
      });
      attributes.push(attribute);
    }

    return attributes;
  };

  _exports.createAttribute = createAttribute;

  let createEntity = function (total) {
    const entities = [];

    for (let i = 0; i < total; i++) {
      const entity = Ember.Object.create({
        entityId: 'entityId' + i,
        commonName: 'commonName' + i,
        codeName: 'codeName' + i,
        alias: ['alias0-' + i, 'alias1-' + i],
        definition: 'definition' + i,
        primaryKeyAttributeCodeName: ['primaryKeyAttributeCodeName0-' + i, 'primaryKeyAttributeCodeName1-' + i],
        index: [{
          codeName: 'attributeIndex0-' + i,
          allowDuplicates: false,
          attributeCodeName: ['attributeCodeName0-' + i]
        }],
        attribute: createAttribute(3),
        foreignKey: [{
          localAttributeCodeName: ['attributeCommonName0-' + i],
          referencedEntityCodeName: 'referencedEntityCodeName0' + i,
          referencedAttributeCodeName: ['referencedAttributeCodeName0-' + i]
        }],
        fieldSeparatorCharacter: ',',
        numberOfHeaderLines: 9,
        quoteCharacter: '"'
      });
      entities.push(entity);
    }

    return entities;
  };

  _exports.createEntity = createEntity;
});
define("mdeditor/tests/helpers/create-extent", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createExtent;

  function createExtent(total) {
    const contacts = [];

    for (let i = 0; i < total; i++) {
      const contact = Ember.Object.create({
        description: 'description' + i,
        geographicExtent: [{
          description: 'description' + i,
          boundingBox: {
            westLongitude: -87.52179241764053,
            eastLongitude: -85.30119385960293,
            southLatitude: 29.640690610830635,
            northLatitude: 30.42485959910817
          },
          containsData: false,
          geographicElement: [{
            type: 'Point',
            coordinates: [100, 0]
          }, {
            type: 'LineString',
            coordinates: [[100, 0], [101, 1]]
          }]
        }, {
          geographicElement: [{
            type: 'Point',
            coordinates: [100, 0]
          }]
        }],
        temporalExtent: [{
          timeInstant: {
            description: 'description' + i,
            dateTime: '2016-10-24T11:10:15.2-10:00'
          }
        }, {
          timePeriod: {
            description: 'description' + i,
            startDateTime: '2016-10-24T11:10:15.2-10:00'
          }
        }],
        verticalExtent: [{
          description: 'description' + i,
          minValue: 9.9,
          maxValue: 9.9,
          crsId: {
            referenceSystemType: 'referenceSystemType',
            referenceSystemIdentifier: {
              identifier: 'identifier'
            }
          }
        }, {
          minValue: 9.9,
          maxValue: 9.9,
          crsId: {
            referenceSystemType: 'referenceSystemType',
            referenceSystemIdentifier: {
              identifier: 'identifier'
            }
          }
        }]
      });
      contacts.push(contact);
    }

    return contacts;
  }
});
define("mdeditor/tests/helpers/create-identifier", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createIdentifier;

  function createIdentifier(total) {
    const identifiers = [];

    for (let i = 0; i < total; i++) {
      const identifier = Ember.Object.create({
        identifier: 'identifier' + i,
        namespace: 'namespace' + i,
        version: 'version' + i,
        description: 'description' + i,
        authority: {
          title: 'title' + i
        }
      });
      identifiers.push(identifier);
    }

    return identifiers;
  }
});
define("mdeditor/tests/helpers/create-map-layer", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createMapLayer;

  function createMapLayer(total) {
    const layers = {
      type: 'FeatureCollection',
      features: []
    };

    for (let i = 1; i < total + 1; i++) {
      const layer = Ember.Object.create({
        type: 'Feature',
        id: i,
        geometry: {
          type: 'Point',
          coordinates: [-104.99404, 39.75621 + i]
        },
        properties: {
          name: `Feature ` + i
        }
      });
      layers.features.push(layer);
    }

    return layers;
  }
});
define("mdeditor/tests/helpers/create-profile", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createProfile;

  function createProfile(total) {
    const profiles = [];

    for (let i = 0; i < total; i++) {
      const profile = Ember.Object.create({
        uri: 'https://jlblcc.github.io/test-profile/profiles/minimal.json',
        alias: 'My alias' + i,
        altDescription: 'alternate decscription' + i,
        remoteVersion: '0.0.1',
        components: {
          record: {
            main: {
              recordId: false,
              purpose: false,
              environmentDescription: false,
              supplementalInfo: false,
              credit: false,
              timePeriod: {
                id: false,
                description: false,
                periodName: false,
                duration: false,
                interval: false
              },
              citation: {
                edition: false,
                onlineResource: {
                  protocol: false
                },
                presentationForm: false,
                otherCitationDetails: false,
                graphic: false,
                series: false,
                identifier: false,
                graphicOverview: false
              },
              graphicOverview: false
            },
            metadata: {
              identifier: {
                identifier: true,
                namespace: true,
                version: false,
                description: false,
                authority: false
              },
              parentMetadata: false,
              alternateMetadataReference: false,
              defaultLocale: false,
              maintenance: false
            }
          }
        },
        description: 'A Minimalist Profile' + i,
        hasUpdate: true,
        identifier: 'minimal',
        localVersion: '0.0.0',
        namespace: 'org.adiwg.profile',
        nav: {
          record: [{
            title: 'Basic Info',
            target: 'record.show.edit.main',
            tip: 'This is a customized tip.'
          }, {
            title: 'About Metadata',
            target: 'record.show.edit.metadata',
            tip: 'Information about the metadata for the resource.'
          }, {
            title: 'Keywords',
            target: 'record.show.edit.keywords',
            tip: 'Terms used to describe the resource.'
          }, {
            title: 'Boundaries',
            target: 'record.show.edit.extent',
            tip: 'Information describing the bounds of the resource.'
          }, {
            title: 'Distribution',
            target: 'record.show.edit.distribution',
            tip: 'Information about obtaining the resource.'
          }],
          dictionary: [{
            title: 'Main',
            target: 'dictionary.show.edit.index',
            tip: 'Basic information about the dictionary.'
          }, {
            title: 'Citation',
            target: 'dictionary.show.edit.citation',
            tip: 'The citation for the dictionary.'
          }, {
            title: 'Tables',
            target: 'dictionary.show.edit.entity',
            tip: 'Information about entities(tables) and attributes(columns or fields).'
          }]
        },
        title: 'Minimal',
        config: JSON.parse('{"identifier":"minimal","namespace":"org.adiwg.profile","alternateId":[],"title":"Minimal","description":"A Minimalist Profile","version":"0.0.0","components":{"record":{"main":{"recordId":false,"purpose":false,"environmentDescription":false,"supplementalInfo":false,"credit":false,"timePeriod":{"id":false,"description":false,"periodName":false,"duration":false,"interval":false},"citation":{"edition":false,"onlineResource":{"protocol":false},"presentationForm":false,"otherCitationDetails":false,"graphic":false,"series":false,"identifier":false,"graphicOverview":false},"graphicOverview":false},"metadata":{"identifier":{"identifier":true,"namespace":true,"version":false,"description":false,"authority":false},"parentMetadata":false,"alternateMetadataReference":false,"defaultLocale":false,"maintenance":false}}},"nav":{"record":[{"title":"Basic Info","target":"record.show.edit.main","tip":"This is a customized tip."},{"title":"About Metadata","target":"record.show.edit.metadata","tip":"Information about the metadata for the resource."},{"title":"Keywords","target":"record.show.edit.keywords","tip":"Terms used to describe the resource."},{"title":"Boundaries","target":"record.show.edit.extent","tip":"Information describing the bounds of the resource."},{"title":"Distribution","target":"record.show.edit.distribution","tip":"Information about obtaining the resource."}],"dictionary":[{"title":"Main","target":"dictionary.show.edit.index","tip":"Basic information about the dictionary."},{"title":"Citation","target":"dictionary.show.edit.citation","tip":"The citation for the dictionary."},{"title":"Tables","target":"dictionary.show.edit.entity","tip":"Information about entities(tables) and attributes(columns or fields)."}]}}')
      });
      profiles.push(profile);
    }

    return profiles;
  }
});
define("mdeditor/tests/helpers/create-record", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createRecord;

  function createRecord(total) {
    const records = [];

    for (let i = 0; i < total; i++) {
      const record = Ember.Object.create({
        json: {
          schema: {
            name: 'mdJson',
            version: '2.6.0'
          },
          contact: [],
          metadata: {
            metadataInfo: {
              metadataIdentifier: {
                identifier: 'r' + i,
                type: 'uuid'
              }
            },
            resourceInfo: {
              resourceType: [{
                type: 'project'
              }],
              citation: {
                title: 'My Record' + i,
                date: [{
                  date: new Date().toISOString(),
                  dateType: 'creation'
                }]
              },
              pointOfrecord: [],
              abstract: 'An abstract.',
              status: ['completed'],
              language: ['eng; USA']
            },
            resourceDistribution: []
          }
        },
        title: 'My Record' + i,
        icon: 'project'
      });
      records.push(record);
    }

    return records;
  }
});
define("mdeditor/tests/helpers/create-taxonomy", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createTaxonomy;

  function createTaxonomy() {
    const taxonomies = [{
      taxonomicClassification: [{
        taxonomicSystemId: '555705',
        taxonomicLevel: 'Kingdom',
        taxonomicName: 'Fungi',
        subClassification: [{
          taxonomicSystemId: '936287',
          taxonomicLevel: 'Subkingdom',
          taxonomicName: 'Dikarya',
          subClassification: [{
            taxonomicSystemId: '623881',
            taxonomicLevel: 'Division',
            taxonomicName: 'Basidiomycota',
            isITIS: true
          }],
          isITIS: true
        }],
        isITIS: true,
        commonName: ['Kingdom']
      }, {
        taxonomicSystemId: '202423',
        taxonomicLevel: 'Kingdom',
        taxonomicName: 'Animalia',
        subClassification: [{
          taxonomicSystemId: '914153',
          taxonomicLevel: 'Subkingdom',
          taxonomicName: 'Radiata',
          subClassification: [{
            taxonomicSystemId: '48738',
            taxonomicLevel: 'Phylum',
            taxonomicName: 'Cnidaria',
            subClassification: [{
              taxonomicSystemId: '718920',
              taxonomicLevel: 'Subphylum',
              taxonomicName: 'Medusozoa',
              subClassification: [{
                taxonomicSystemId: '51483',
                taxonomicLevel: 'Class',
                taxonomicName: 'Scyphozoa',
                subClassification: [{
                  taxonomicSystemId: '718923',
                  taxonomicLevel: 'Subclass',
                  taxonomicName: 'Discomedusae',
                  subClassification: [{
                    taxonomicSystemId: '51756',
                    taxonomicLevel: 'Order',
                    taxonomicName: 'Rhizostomeae',
                    subClassification: [{
                      taxonomicSystemId: '51911',
                      taxonomicLevel: 'Family',
                      taxonomicName: 'Rhizostomatidae',
                      subClassification: [{
                        taxonomicSystemId: '51919',
                        taxonomicLevel: 'Genus',
                        taxonomicName: 'Rhopilema',
                        subClassification: [{
                          taxonomicSystemId: '51920',
                          taxonomicLevel: 'Species',
                          taxonomicName: 'Rhopilema verrilli',
                          commonName: ['mushroom jellyfish'],
                          isITIS: true
                        }],
                        isITIS: true
                      }],
                      isITIS: true
                    }],
                    isITIS: true
                  }],
                  isITIS: true
                }],
                isITIS: true
              }],
              isITIS: true
            }],
            isITIS: true
          }],
          isITIS: true
        }],
        isITIS: true
      }],
      taxonomicSystem: [{
        citation: {
          title: 'Integrated Taxonomic Information System (ITIS)',
          date: [{
            date: '2019-02-26',
            dateType: 'transmitted',
            description: 'Taxa imported from ITIS'
          }],
          presentationForm: ['webService', 'webSite'],
          otherCitationDetails: ['Retrieved from the Integrated Taxonomic Information System on-line database, https://www.itis.gov.'],
          onlineResource: [{
            uri: 'https://www.itis.gov',
            name: 'ITIS website',
            protocol: 'HTTPS',
            function: 'information',
            description: 'ITIS contains taxonomic information on plants, animals, fungi, and microbes of North America and the world.'
          }],
          graphic: [{
            fileName: 'itis_logo.jpg',
            fileType: 'JPEG',
            fileUri: [{
              uri: 'https://itis.gov/Static/images/itis_logo.jpg'
            }]
          }]
        },
        modifications: 'modifications'
      }],
      observer: [{
        party: [{
          contactId: 'CID003'
        }],
        role: 'pointOfContact'
      }],
      voucher: [{
        repository: {
          party: [{
            contactId: 'CID003'
          }],
          role: 'custodian'
        },
        specimen: 'Specimen'
      }],
      generalScope: 'Scope',
      identificationProcedure: 'Id Procedure',
      identificationCompleteness: 'Id Completeness'
    }, {
      taxonomicSystem: [{
        citation: {
          title: 'ITIS - Integrated Taxonomic Information System',
          alternateTitle: ['Citation for ITIS'],
          date: [{
            date: '2013-06-22',
            dateType: 'publication'
          }],
          responsibleParty: [{
            role: 'originator',
            party: [{
              contactId: 'CID004'
            }]
          }]
        },
        modifications: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      }, {
        citation: {
          title: 'Some OTHER Taxonomic System',
          date: [{
            date: '2013-06-22',
            dateType: 'publication'
          }],
          responsibleParty: [{
            role: 'originator',
            party: [{
              contactId: 'CID004'
            }]
          }]
        }
      }],
      generalScope: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      identificationReference: [{
        title: 'citation',
        identifier: [{
          identifier: 'identifier0',
          namespace: 'namespace0',
          version: 'version0',
          description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
          authority: {
            title: 'title0',
            date: [{
              date: '2013-06-22',
              dateType: 'publication'
            }],
            responsibleParty: [{
              role: 'originator',
              party: [{
                contactId: 'CID004'
              }]
            }]
          }
        }]
      }, {
        title: 'citation1',
        identifier: [{
          identifier: 'identifier1',
          namespace: 'namespace1',
          version: 'version1',
          description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
          authority: {
            title: 'title1',
            date: [{
              date: '2013-06-22',
              dateType: 'publication'
            }],
            responsibleParty: [{
              role: 'originator',
              party: [{
                contactId: 'CID004'
              }]
            }]
          }
        }]
      }],
      observer: [{
        party: [{
          contactId: 'CID006'
        }, {
          contactId: 'CID004'
        }],
        role: 'coPrincipalInvestigator'
      }, {
        party: [{
          contactId: 'CID001'
        }],
        role: 'editor'
      }],
      identificationProcedure: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      identificationCompleteness: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      voucher: [{
        repository: {
          role: 'custodian',
          party: [{
            contactId: 'CID002'
          }]
        },
        specimen: 'bear claw'
      }, {
        repository: {
          role: 'custodian',
          party: [{
            contactId: 'CID002'
          }]
        },
        specimen: 'moose tooth'
      }],
      taxonomicClassification: [{
        taxonomicLevel: 'taxonomicLevel0',
        taxonomicName: 'taxonomicName',
        commonName: ['commonName0', 'commonName1'],
        subClassification: [{
          taxonomicSystemId: 'taxonomicSystemId00',
          taxonomicLevel: 'taxonomicLevel00',
          taxonomicName: 'taxonomicName',
          commonName: ['commonName0', 'commonName1'],
          subClassification: [{
            taxonomicLevel: 'taxonomicLevel000',
            taxonomicName: 'taxonomicName',
            commonName: ['commonName0', 'commonName1'],
            subClassification: [{
              taxonomicSystemId: 'taxonomicSystemId0000.1',
              taxonomicLevel: 'taxonomicLevel0000.1',
              taxonomicName: 'taxonomicName',
              commonName: ['commonName0', 'commonName1']
            }, {
              taxonomicSystemId: 'taxonomicSystemId0000.2',
              taxonomicLevel: 'taxonomicLevel0000.2',
              taxonomicName: 'taxonomicName',
              commonName: ['commonName0', 'commonName1']
            }]
          }]
        }, {
          taxonomicLevel: 'taxonomicLevel01',
          taxonomicName: 'taxonomicName',
          commonName: ['commonName0', 'commonName1'],
          subClassification: [{
            taxonomicLevel: 'taxonomicLevel010',
            taxonomicName: 'taxonomicName',
            commonName: ['commonName0', 'commonName1']
          }]
        }]
      }, {
        taxonomicLevel: 'taxonomicLevel0201',
        taxonomicName: 'taxonomicName'
      }]
    }];
    return taxonomies;
  }
});
define("mdeditor/tests/helpers/data-transfer", ["exports", "ember-drag-drop/test-support/helpers/data-transfer"], function (_exports, _dataTransfer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _dataTransfer.default;
    }
  });
});
define("mdeditor/tests/helpers/destroy-app", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = destroyApp;

  function destroyApp(application) {
    var store = application.__container__.lookup('service:store');

    if (store) {
      Ember.run(function () {
        store.unloadAll();
        application.destroy();
      });
    } else {
      Ember.run(application, 'destroy');
    }
  }
});
define("mdeditor/tests/helpers/drag-drop", ["exports", "ember-drag-drop/test-support/helpers/drag-drop"], function (_exports, _dragDrop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  var _exportNames = {};
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _dragDrop.default;
    }
  });
  Object.keys(_dragDrop).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in _exports && _exports[key] === _dragDrop[key]) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function () {
        return _dragDrop[key];
      }
    });
  });
});
define("mdeditor/tests/helpers/ember-cli-file-picker", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.uploadFileHelper = _exports.uploadFile = void 0;

  function createFile(content = ['test'], options = {}) {
    const {
      name,
      type,
      lastModifiedDate
    } = options;
    const file = new Blob(content, {
      type: type ? type : 'text/plain'
    });
    file.name = name ? name : 'test.txt';
    return file;
  }

  const uploadFileHelper = function (content, options) {
    const file = createFile(content, options);
    const event = jQuery.Event('change');
    event.target = {
      files: [file]
    };
    jQuery('.file-picker__input').trigger(event);
  };

  _exports.uploadFileHelper = uploadFileHelper;
  const uploadFile = Ember.Test.registerAsyncHelper('uploadFile', function (app, content, options) {
    uploadFileHelper(content, options);
    return wait();
  });
  _exports.uploadFile = uploadFile;
});
define("mdeditor/tests/helpers/ember-drag-drop", ["exports", "mdeditor/tests/helpers/data-transfer"], function (_exports, _dataTransfer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.drag = drag;

  function drop($dragHandle, dropCssPath, dragEvent) {
    let dropTarget = document.querySelector(dropCssPath);

    if (dropTarget.length === 0) {
      throw new Error(`There are no drop targets by the given selector: '${dropCssPath}'`);
    }

    Ember.run(() => {
      triggerEvent(dropTarget, 'dragover', _dataTransfer.default.makeMockEvent());
    });
    Ember.run(() => {
      triggerEvent(dropTarget, 'drop', _dataTransfer.default.makeMockEvent(dragEvent.dataTransfer.get('data.payload')));
    });
    Ember.run(() => {
      triggerEvent($dragHandle, 'dragend', _dataTransfer.default.makeMockEvent());
    });
  }

  function drag(cssPath, options = {}) {
    let dragEvent = _dataTransfer.default.makeMockEvent();

    let dragHandle = document.querySelector(cssPath);
    Ember.run(() => {
      triggerEvent(dragHandle, 'mouseover');
    });
    Ember.run(() => {
      triggerEvent(dragHandle, 'dragstart', dragEvent);
    });
    andThen(function () {
      if (options.beforeDrop) {
        options.beforeDrop.call();
      }
    });
    andThen(function () {
      if (options.drop) {
        drop(dragHandle, options.drop, dragEvent);
      }
    });
  }
});
define("mdeditor/tests/helpers/ember-power-select", ["exports", "ember-power-select/test-support/helpers"], function (_exports, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = deprecatedRegisterHelpers;
  _exports.selectChoose = _exports.touchTrigger = _exports.nativeTouch = _exports.clickTrigger = _exports.typeInSearch = _exports.triggerKeydown = _exports.nativeMouseUp = _exports.nativeMouseDown = _exports.findContains = void 0;

  function deprecateHelper(fn, name) {
    return function (...args) {
      (true && !(false) && Ember.deprecate(`DEPRECATED \`import { ${name} } from '../../tests/helpers/ember-power-select';\` is deprecated. Please, replace it with \`import { ${name} } from 'ember-power-select/test-support/helpers';\``, false, {
        until: '1.11.0',
        id: `ember-power-select-test-support-${name}`
      }));
      return fn(...args);
    };
  }

  let findContains = deprecateHelper(_helpers.findContains, 'findContains');
  _exports.findContains = findContains;
  let nativeMouseDown = deprecateHelper(_helpers.nativeMouseDown, 'nativeMouseDown');
  _exports.nativeMouseDown = nativeMouseDown;
  let nativeMouseUp = deprecateHelper(_helpers.nativeMouseUp, 'nativeMouseUp');
  _exports.nativeMouseUp = nativeMouseUp;
  let triggerKeydown = deprecateHelper(_helpers.triggerKeydown, 'triggerKeydown');
  _exports.triggerKeydown = triggerKeydown;
  let typeInSearch = deprecateHelper(_helpers.typeInSearch, 'typeInSearch');
  _exports.typeInSearch = typeInSearch;
  let clickTrigger = deprecateHelper(_helpers.clickTrigger, 'clickTrigger');
  _exports.clickTrigger = clickTrigger;
  let nativeTouch = deprecateHelper(_helpers.nativeTouch, 'nativeTouch');
  _exports.nativeTouch = nativeTouch;
  let touchTrigger = deprecateHelper(_helpers.touchTrigger, 'touchTrigger');
  _exports.touchTrigger = touchTrigger;
  let selectChoose = deprecateHelper(_helpers.selectChoose, 'selectChoose');
  _exports.selectChoose = selectChoose;

  function deprecatedRegisterHelpers() {
    (true && !(false) && Ember.deprecate("DEPRECATED `import registerPowerSelectHelpers from '../../tests/helpers/ember-power-select';` is deprecated. Please, replace it with `import registerPowerSelectHelpers from 'ember-power-select/test-support/helpers';`", false, {
      until: '1.11.0',
      id: 'ember-power-select-test-support-register-helpers'
    }));
    return (0, _helpers.default)();
  }
});
define("mdeditor/tests/helpers/flash-message", ["ember-cli-flash/flash/object"], function (_object) {
  "use strict";

  _object.default.reopen({
    init() {
      return this;
    }

  });
});
define("mdeditor/tests/helpers/md-helpers", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.parseInput = parseInput;
  _exports.formatContent = formatContent;
  _exports.lsClean = _exports.nestedValues = void 0;

  /**
   * The parseInput helper will query for any input, textarea, or instance of
   * md-select and return the value(s) as a delimited string. Set delimiter to
   * `false` to return an array of values.
   *
   * @method parseInput
   * @param {Element} e The element to parse
   * @param {String|false} delimiter The delimiter to use, Defaults to `|`. Set to `false` to
   * return `[values]`
   * @static
   * @return {String|Array}
   */
  function parseInput(e, delimiter = '|') {
    // TODO: Support md-toggle
    let text = Array.from(e.querySelectorAll('input,textarea,.md-select')).map(i => (i.type === 'checkbox' ? i.checked.toString() : false) || i.value || Array.from(i.querySelectorAll('.select-value')).map(n => n.textContent).join('|'));
    return delimiter ? text.join(delimiter) : text;
  }

  function formatContent(t) {
    return t.textContent.replace(/[\s\n]+/g, '|').trim();
  }

  let nestedValues = obj => typeof obj === 'object' ? Object.values(obj).map(nestedValues).flat() : [obj];

  _exports.nestedValues = nestedValues;

  let lsClean = () => {
    let ls = window.localStorage;
    Object.keys(ls).forEach(k => {
      // eslint-disable-next-line no-useless-escape
      if (k.match(/^test\:/)) {
        ls.removeItem(k);
        console.info('Removed record:' + k);
      }
    });
  };

  _exports.lsClean = lsClean;
});
define("mdeditor/tests/helpers/mock-event", ["exports", "ember-drag-drop/test-support/helpers/mock-event"], function (_exports, _mockEvent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  var _exportNames = {};
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _mockEvent.default;
    }
  });
  Object.keys(_mockEvent).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in _exports && _exports[key] === _mockEvent[key]) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function () {
        return _mockEvent[key];
      }
    });
  });
});
define("mdeditor/tests/helpers/modal-asserts", ["exports", "jquery", "qunit"], function (_exports, _jquery, _qunit) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = registerAssertHelpers;

  function registerAssertHelpers() {
    const {
      assert
    } = _qunit.default;
    const overlaySelector = '.md-modal-overlay';
    const dialogSelector = '.ember-modal-dialog';

    assert.isPresentOnce = function (selector, message) {
      message = message || `${selector} is present in DOM once`;
      return this.equal((0, _jquery.default)(selector).length, 1, message);
    };

    assert.isAbsent = function (selector, message) {
      message = message || `${selector} is absent from DOM`;
      return this.equal((0, _jquery.default)(selector).length, 0, message);
    };

    assert.isVisible = function (selector, message) {
      message = message || `${selector} is not visible`;
      return this.ok((0, _jquery.default)(selector).is(':visible'), message);
    };

    assert.dialogOpensAndCloses = function (options
    /*, message*/
    ) {
      //message = message || `Dialog triggered by ${options.openSelector} failed to open and close`;
      const dialogContent = options.dialogText ? [dialogSelector, `:contains(${options.dialogText})`].join('') : dialogSelector;
      const self = this;
      return click(options.openSelector, options.context).then(function () {
        if (options.hasOverlay) {
          self.isPresentOnce(overlaySelector);
        }

        self.isPresentOnce(dialogContent);

        if (options.whileOpen) {
          options.whileOpen();
        }

        return click(options.closeSelector, options.context).then(function () {
          self.isAbsent(overlaySelector);
          self.isAbsent(dialogContent);
        });
      });
    };
  }
});
define("mdeditor/tests/helpers/start-app", ["exports", "mdeditor/app", "mdeditor/config/environment", "mdeditor/tests/helpers/modal-asserts", "mdeditor/tests/helpers/ember-power-select"], function (_exports, _app, _environment, _modalAsserts, _emberPowerSelect) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = startApp;
  (0, _emberPowerSelect.default)();

  function startApp(attrs) {
    let attributes = Ember.merge({}, _environment.default.APP);
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(() => {
      let application = _app.default.create(attributes);

      application.setupForTesting();
      application.injectTestHelpers();
      (0, _modalAsserts.default)();
      return application;
    });
  }
});
define("mdeditor/tests/integration/components/feature-form-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | feature form', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('model', {
        id: 'foo',
        properties: {
          name: 'bar',
          description: 'foobar'
        }
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{feature-form model=model}}
      */
      {
        "id": "axo9oJLQ",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"feature-form\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), '|Feature|ID|Name|Description|Other|Properties|read-only|Name|Value|None|found.|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#feature-form model=model}}
              template block text
            {{/feature-form}}
          
      */
      {
        "id": "GSum4Rv2",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"model\"],[[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"feature-form\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), '|Feature|ID|Name|Description|Other|Properties|read-only|Name|Value|None|found.|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/components/feature-group-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-map-layer"], function (_testHelpers, _qunit, _emberQunit, _createMapLayer) {
  "use strict";

  (0, _qunit.module)('Integration | Component | feature group', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('layers', (0, _createMapLayer.default)(2)); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#leaflet-draw lat=0 lng=0 zoom=2}}
              {{!-- Specify child layer components here --}}
              {{#layer-group name="Terrain" baselayer=true default=true}}
                {{tile-layer url="http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png" attribution=mapAttribution}}
              {{/layer-group}}
      
              {{#feature-group name="Extents" default=true}}
                {{#each layers as |l|}}
                  {{geojson-layer geoJSON=l draw=true}}
                {{/each}}
              {{/feature-group}}
      
              {{layer-control}}
            {{/leaflet-draw}}
          
      */
      {
        "id": "h09n+A9t",
        "block": "{\"symbols\":[\"l\"],\"statements\":[[2,\"\\n\"],[6,[37,9],null,[[\"lat\",\"lng\",\"zoom\"],[0,0,2]],[[\"default\"],[{\"statements\":[[6,[37,6],null,[[\"name\",\"baselayer\",\"default\"],[\"Terrain\",true,true]],[[\"default\"],[{\"statements\":[[2,\"          \"],[1,[30,[36,5],null,[[\"url\",\"attribution\"],[\"http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png\",[35,4]]]]],[2,\"\\n\"]],\"parameters\":[]}]]],[2,\"\\n\"],[6,[37,7],null,[[\"name\",\"default\"],[\"Extents\",true]],[[\"default\"],[{\"statements\":[[6,[37,3],[[30,[36,2],[[30,[36,2],[[35,1]],null]],null]],null,[[\"default\"],[{\"statements\":[[2,\"            \"],[1,[30,[36,0],null,[[\"geoJSON\",\"draw\"],[[32,1],true]]]],[2,\"\\n\"]],\"parameters\":[1]}]]]],\"parameters\":[]}]]],[2,\"\\n        \"],[1,[34,8]],[2,\"\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"geojson-layer\",\"layers\",\"-track-array\",\"each\",\"mapAttribution\",\"tile-layer\",\"layer-group\",\"feature-group\",\"layer-control\",\"leaflet-draw\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.leaflet-container').innerText.trim().replace(/\n/g, '|'), '+|−|Draw a polyline|Draw a polygon|Draw a rectangle|Draw a marker|3000 km|2000 mi|Leaflet');
    });
  });
});
define("mdeditor/tests/integration/components/feature-table-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-map-layer"], function (_testHelpers, _qunit, _emberQunit, _createMapLayer) {
  "use strict";

  (0, _qunit.module)('Integration | Component | feature table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.zoomTo = function () {
        assert.ok(true, 'called zoomTo');
      };

      this.showForm = function () {
        assert.ok(true, 'clicked showForm');
      };

      this.deleteFeature = function () {
        assert.ok(true, 'clicked deleteFeature');
      };

      this.set('data', (0, _createMapLayer.default)(2));
      assert.expect(4);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{feature-table
            data=data.features
            columnComponents=(hash
              leaflet-table-row-actions=(component "leaflet-table-row-actions"
              showForm=showForm
              zoomTo=zoomTo
              deleteFeature=deleteFeature
            ))
          }}
      */
      {
        "id": "FjpGw4XW",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,6],null,[[\"data\",\"columnComponents\"],[[35,5,[\"features\"]],[30,[36,4],null,[[\"leaflet-table-row-actions\"],[[30,[36,3],[\"leaflet-table-row-actions\"],[[\"showForm\",\"zoomTo\",\"deleteFeature\"],[[35,2],[35,1],[35,0]]]]]]]]]]]],\"hasEval\":false,\"upvars\":[\"deleteFeature\",\"zoomTo\",\"showForm\",\"component\",\"hash\",\"data\",\"feature-table\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.feature-table').textContent.replace(/[\s, \t]/g, '\n').trim().replace(/[ +\n]+/g, '|'), 'Search:|Columns|Show|All|Hide|All|Restore|Defaults|ID|Name|Description|ID|Name|Description|ID|Name|Description|1|Feature|1|2|Feature|2|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|500|Page:|1');
      await (0, _testHelpers.click)((0, _testHelpers.find)('td .btn-success'));
      await (0, _testHelpers.click)((0, _testHelpers.find)('td .btn-info'));
      await (0, _testHelpers.click)((0, _testHelpers.find)('td .btn-danger'));
    });
  });
});
define("mdeditor/tests/integration/components/geojson-layer-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-map-layer"], function (_testHelpers, _qunit, _emberQunit, _createMapLayer) {
  "use strict";

  (0, _qunit.module)('Integration | Component | geojson layer', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('layers', (0, _createMapLayer.default)(2)); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#leaflet-draw lat=0 lng=0 zoom=2}}
              {{!-- Specify child layer components here --}}
              {{#layer-group name="Terrain" baselayer=true default=true}}
                {{tile-layer url="http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png" attribution=mapAttribution}}
              {{/layer-group}}
      
              {{#feature-group name="Extents" default=true}}
                {{#each layers as |l|}}
                  {{geojson-layer geoJSON=l draw=true editLayers=layers}}
                {{/each}}
              {{/feature-group}}
      
              {{layer-control}}
            {{/leaflet-draw}}
          
      */
      {
        "id": "coCU0Pd4",
        "block": "{\"symbols\":[\"l\"],\"statements\":[[2,\"\\n\"],[6,[37,9],null,[[\"lat\",\"lng\",\"zoom\"],[0,0,2]],[[\"default\"],[{\"statements\":[[6,[37,6],null,[[\"name\",\"baselayer\",\"default\"],[\"Terrain\",true,true]],[[\"default\"],[{\"statements\":[[2,\"          \"],[1,[30,[36,5],null,[[\"url\",\"attribution\"],[\"http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png\",[35,4]]]]],[2,\"\\n\"]],\"parameters\":[]}]]],[2,\"\\n\"],[6,[37,7],null,[[\"name\",\"default\"],[\"Extents\",true]],[[\"default\"],[{\"statements\":[[6,[37,3],[[30,[36,2],[[30,[36,2],[[35,0]],null]],null]],null,[[\"default\"],[{\"statements\":[[2,\"            \"],[1,[30,[36,1],null,[[\"geoJSON\",\"draw\",\"editLayers\"],[[32,1],true,[35,0]]]]],[2,\"\\n\"]],\"parameters\":[1]}]]]],\"parameters\":[]}]]],[2,\"\\n        \"],[1,[34,8]],[2,\"\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"layers\",\"geojson-layer\",\"-track-array\",\"each\",\"mapAttribution\",\"tile-layer\",\"layer-group\",\"feature-group\",\"layer-control\",\"leaflet-draw\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.leaflet-container').innerText.trim().replace(/\n/g, '|'), '+|−|Draw a polyline|Draw a polygon|Draw a rectangle|Draw a marker|3000 km|2000 mi|Leaflet');
    });
  });
});
define("mdeditor/tests/integration/components/leaflet-draw-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-map-layer"], function (_testHelpers, _qunit, _emberQunit, _createMapLayer) {
  "use strict";

  (0, _qunit.module)('Integration | Component | leaflet draw', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('layers', (0, _createMapLayer.default)(2)); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#leaflet-draw lat=0 lng=0 zoom=2}}
              {{!-- Specify child layer components here --}}
              {{#layer-group name="Terrain" baselayer=true default=true}}
                {{tile-layer url="http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png" attribution=mapAttribution}}
              {{/layer-group}}
      
              {{layer-control}}
            {{/leaflet-draw}}
          
      */
      {
        "id": "KWvsyNAa",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,4],null,[[\"lat\",\"lng\",\"zoom\"],[0,0,2]],[[\"default\"],[{\"statements\":[[6,[37,2],null,[[\"name\",\"baselayer\",\"default\"],[\"Terrain\",true,true]],[[\"default\"],[{\"statements\":[[2,\"          \"],[1,[30,[36,1],null,[[\"url\",\"attribution\"],[\"http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png\",[35,0]]]]],[2,\"\\n\"]],\"parameters\":[]}]]],[2,\"\\n        \"],[1,[34,3]],[2,\"\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"mapAttribution\",\"tile-layer\",\"layer-group\",\"layer-control\",\"leaflet-draw\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.leaflet-container').innerText.trim().replace(/\n/g, '|'), '+|−|Draw a polyline|Draw a polygon|Draw a rectangle|Draw a marker|3000 km|2000 mi|Leaflet');
    });
  });
});
define("mdeditor/tests/integration/components/leaflet-table-row-actions-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | leaflet table row actions', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.zoomTo = function () {};

      this.showForm = function () {};

      this.deleteFeature = function () {};

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{leaflet-table-row-actions
            zoomTo=zoomTo
            showForm=showForm
            deleteFeature=deleteFeature
          }}
      */
      {
        "id": "tb7O7Uuy",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,3],null,[[\"zoomTo\",\"showForm\",\"deleteFeature\"],[[35,2],[35,1],[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"deleteFeature\",\"showForm\",\"zoomTo\",\"leaflet-table-row-actions\"]}",
        "meta": {}
      }));
      assert.dom('button').exists({
        count: 3
      });
    });
  });
});
define("mdeditor/tests/integration/components/leaflet-table-row-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | leaflet table row', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{leaflet-table-row}}
      */
      {
        "id": "KbmpM+Fp",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"leaflet-table-row\"]}",
        "meta": {}
      }));
      assert.dom('tr').exists({
        count: 1
      });
    });
  });
});
define("mdeditor/tests/integration/components/leaflet-table-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-map-layer"], function (_testHelpers, _qunit, _emberQunit, _createMapLayer) {
  "use strict";

  (0, _qunit.module)('Integration | Component | leaflet table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('layers', (0, _createMapLayer.default)(2));
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{leaflet-table layers=layers.features
            resizeDebouncedEventsEnabled=true}}
      */
      {
        "id": "U73mcPbv",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"layers\",\"resizeDebouncedEventsEnabled\"],[[35,0,[\"features\"]],true]]]]],\"hasEval\":false,\"upvars\":[\"layers\",\"leaflet-table\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.feature-table').textContent.replace(/[\s\t]/g, '\n').trim().replace(/[ \n]+/g, '|'), 'ID|Name|Description|ID|Name|Description|1|Feature|1|2|Feature|2|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|500|Page:|1');
    });
  });
});
define("mdeditor/tests/integration/components/sb-publisher-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-record"], function (_testHelpers, _qunit, _emberQunit, _createRecord) {
  "use strict";

  (0, _qunit.module)('Integration | Component | sb publisher', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('config', {
        name: 'ScienceBase',
        route: 'sciencebase',
        description: 'ScienceBase is a collaborative scientific data and information management platform',
        //image: 'https://prd-wret.s3-us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/styles/content_list_thumbnail/public/thumbnails/image/ScienceBase-DescImage.jpg'
        icon: 'globe',
        rootURI: 'https://api.sciencebase.gov/sbmd-service/',
        jossoURL: 'https://www.sciencebase.gov/catalog/jossoHelper/sessionInfo?includeJossoSessionId=true',
        rootItemURL: 'https://www.sciencebase.gov/catalog/item/',
        defaultParent: '59ef8a34e4b0220bbd98d449',
        settingsComponent: 'sb-settings'
      });
      this.set('settings', Ember.Object.create({
        data: {
          publishOptions: {}
        }
      }));
      this.set('records', (0, _createRecord.default)(3));
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{sb-publisher config=config settings=settings records=records}}
      */
      {
        "id": "KN/a1uRU",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,3],null,[[\"config\",\"settings\",\"records\"],[[35,2],[35,1],[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"records\",\"settings\",\"config\",\"sb-publisher\"]}",
        "meta": {}
      }));
      assert.dom('.tree-leaf').exists({
        count: 4
      });
    });
  });
});
define("mdeditor/tests/integration/components/sb-settings-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | sb settings', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{sb-settings}}
      */
      {
        "id": "MNqa/APK",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"sb-settings\"]}",
        "meta": {}
      }));
      assert.dom('input').exists({
        count: 1
      });
    });
  });
});
define("mdeditor/tests/integration/components/sb-tree-label-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | sb tree label', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('model', {
        definition: 'Final report outlining the Data Management Strategy for the Science Agency.',
        hideCheck: false,
        icon: 'android',
        id: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8',
        identifier: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8',
        isSelected: false,
        label: 'Data Management Strategy',
        nodeClass: 'tree-node-rooted',
        notSelectable: false,
        sbDate: null,
        sbId: 'test',
        sbParentId: null,
        sbParentIdObj: undefined,
        sortOrder: 0,
        type: 'application',
        uuid: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8'
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{sb-tree-label model=model}}
      */
      {
        "id": "gxBfNF8r",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"sb-tree-label\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.tree-cell').innerText.trim(), 'Data Management Strategy : test Parent Id: None --');
    });
  });
});
define("mdeditor/tests/integration/components/sb-tree-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | sb tree', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('model', [{
        children: [{
          definition: 'Child 1.',
          hideCheck: false,
          icon: 'globe',
          id: '4ebb8fe5-f88f-49a4-9964-1',
          identifier: '4ebb8fe5-f88f-49a4-9964-1',
          isSelected: false,
          label: 'Child 1',
          nodeClass: 'tree-node-rooted',
          notSelectable: false,
          sbDate: null,
          sbId: 'test1',
          sbParentId: null,
          sbParentIdObj: undefined,
          sortOrder: 0,
          type: 'map',
          uuid: '4ebb8fe5-f88f-49a4-9964-1'
        }],
        definition: 'Final report outlining the Data Management Strategy for the Science Agency.',
        hideCheck: false,
        isExpanded: true,
        isRoot: true,
        icon: 'android',
        id: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8',
        identifier: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8',
        isSelected: false,
        label: 'Data Management Strategy',
        nodeClass: 'tree-node-rooted',
        notSelectable: false,
        sbDate: null,
        sbId: 'test',
        sbParentId: null,
        sbParentIdObj: undefined,
        sortOrder: 0,
        type: 'application',
        uuid: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8'
      }]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{sb-tree model=model labelComponent="sb-tree-label"}}
      */
      {
        "id": "KggtoQtm",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\",\"labelComponent\"],[[35,0],\"sb-tree-label\"]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"sb-tree\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.tree-trunk').innerText.replace(/[\s\t]/g, '\n').trim().replace(/[ \n]+/g, '|'), 'Data|Management|Strategy|:|test|?|Child|1|:|test1|Parent|Id:|None|--|?');
      assert.equal((0, _testHelpers.findAll)('.tree-branch')[1].innerText.replace(/[\s\t]/g, '\n').trim().replace(/[ \n]+/g, '|'), 'Child|1|:|test1|Parent|Id:|None|--|?');
    });
  });
});
define("mdeditor/tests/integration/components/tree-branch-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | tree branch', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('model', {
        broader: 'foo0',
        children: [{
          broader: 'foo2',
          children: [],
          label: 'foo2label',
          uuid: 'foo2'
        }],
        label: 'foo1label',
        uuid: 'foo1'
      });
      this.set('selected', [{
        identifier: 'bar1'
      }]);
      this.set('path', [{
        label: 'fiz',
        identifier: 1
      }, {
        label: 'faz',
        identifier: 10
      }, {
        label: 'foz',
        identifier: 100
      }]);
      this.set('select', function () {
        assert.ok(true, 'called select');
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{tree-branch model=model
                select=select
                selected=selected
                nodeDepth=3
                path=path
            }}
      */
      {
        "id": "eAw3JjkA",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n      \"],[1,[30,[36,4],null,[[\"model\",\"select\",\"selected\",\"nodeDepth\",\"path\"],[[35,3],[35,2],[35,1],3,[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"path\",\"selected\",\"select\",\"model\",\"tree-branch\"]}",
        "meta": {}
      }));
      assert.expect(3);
      assert.equal((0, _testHelpers.find)('.tree-branch').innerText.trim(), 'foo1label'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#tree-branch model=model
              select=select
              selected=selected
              nodeDepth=3
              path=path
            }}
              template block text
            {{/tree-branch}}
          
      */
      {
        "id": "Ifzz7czP",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,4],null,[[\"model\",\"select\",\"selected\",\"nodeDepth\",\"path\"],[[35,3],[35,2],[35,1],3,[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"path\",\"selected\",\"select\",\"model\",\"tree-branch\"]}",
        "meta": {}
      }));
      await (0, _testHelpers.click)('.tree-leaf .toggle-icon');
      assert.equal((0, _testHelpers.find)('.tree-branch').innerText.replace(/[\s\n]+/g, '|'), '|foo1label|foo2label');
      assert.equal((0, _testHelpers.findAll)('.tree-leaf')[1].querySelectorAll('.tree-indent').length, 3, 'proper indentation');
    });
  });
});
define("mdeditor/tests/integration/components/tree-label-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | tree label', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        broader: 'foo0',
        children: [{
          broader: 'foo2',
          children: [],
          label: 'foo2label',
          uuid: 'foo2'
        }],
        label: 'foo1label',
        uuid: 'foo1'
      }); // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{tree-label model=model}}
      */
      {
        "id": "DKW/F/8i",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"tree-label\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.tree-label-text').innerText.trim(), 'foo1label'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#tree-label model=model}}
              template block text
            {{/tree-label}}
          
      */
      {
        "id": "Rsk6LM4w",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"model\"],[[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"tree-label\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.tree-label-text').innerText.trim(), 'foo1label');
    });
  });
});
define("mdeditor/tests/integration/components/tree-leaf-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | tree leaf', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('model', {
        broader: 'foo0',
        children: [{
          broader: 'foo2',
          children: [],
          label: 'foo2label',
          uuid: 'foo2'
        }],
        label: 'foo1label',
        uuid: 'foo1'
      });
      this.set('selected', [{
        identifier: 'foo1'
      }]);
      this.set('nodePath', [{
        label: 'fiz',
        identifier: 1
      }, {
        label: 'faz',
        identifier: 10
      }, {
        label: 'foz',
        identifier: 100
      }]);
      this.set('select', function () {
        assert.ok(true, 'called select');
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{tree-leaf model=model
            inTree=true
            select=select
            selected=selected
            nodeDepth=3
            nodePath=nodePath
          }}
      */
      {
        "id": "bns0zg2f",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,4],null,[[\"model\",\"inTree\",\"select\",\"selected\",\"nodeDepth\",\"nodePath\"],[[35,3],true,[35,2],[35,1],3,[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"nodePath\",\"selected\",\"select\",\"model\",\"tree-leaf\"]}",
        "meta": {}
      }));
      await (0, _testHelpers.click)('.toggle-icon');
      assert.equal((0, _testHelpers.find)('.tree-leaf').innerText.trim(), 'foo1label'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#tree-leaf model=model
              inTree=false
              select=select
              selected=selected
            }}
              template block text
            {{/tree-leaf}}
          
      */
      {
        "id": "cc1XJvU5",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,3],null,[[\"model\",\"inTree\",\"select\",\"selected\"],[[35,2],false,[35,1],[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"selected\",\"select\",\"model\",\"tree-leaf\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.tree-leaf').innerText.trim(), 'foo1label');
      assert.dom('.tree-indent').doesNotExist('not in tree');
    });
  });
});
define("mdeditor/tests/integration/components/tree-search-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | tree search', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('model', [{
        broader: 'foo0',
        children: [{
          broader: 'foo2',
          children: [],
          label: 'foo2label',
          uuid: 'foo2'
        }],
        label: 'foo1label',
        uuid: 'foo1'
      }, {
        broader: 'barfoo0',
        children: [],
        label: 'barfoo1label',
        uuid: 'barfoo1'
      }]);
      this.set('selected', [{
        identifier: 'bar1'
      }]);
      this.set('select', function () {
        assert.ok(true, 'called select');
      });
      this.set('searchString', 'foo');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{tree-search
              model=model
              selected=selected
              select=select
              searchString=searchString
              exactMatch=exactMatch
            }}
      */
      {
        "id": "mGVn+CPi",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n      \"],[1,[30,[36,5],null,[[\"model\",\"selected\",\"select\",\"searchString\",\"exactMatch\"],[[35,4],[35,3],[35,2],[35,1],[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"exactMatch\",\"searchString\",\"select\",\"selected\",\"model\",\"tree-search\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.tree-search').innerText.replace(/[ \n]+/g, '|'), 'Search|Tree:|Exact|Match|3|matches|found.|barfoo1label|foo1label|foo2label', 'search OK');
      this.set('exactMatch', true);
      assert.equal((0, _testHelpers.find)('.tree-search').innerText.replace(/[ \n]+/g, '|'), 'Search|Tree:|Exact|Match|2|matches|found.|foo1label|foo2label', 'exact match'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#tree-search
              model=model
              selected=selected
              select=select
            }}
              template block text
            {{/tree-search}}
          
      */
      {
        "id": "glxnrfT5",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,3],null,[[\"model\",\"selected\",\"select\"],[[35,2],[35,1],[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"select\",\"selected\",\"model\",\"tree-search\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.tree-search').innerText.replace(/[ \n]+/g, '|'), 'Search|Tree:|Exact|Match|template|block|text', 'block');
    });
  });
});
define("mdeditor/tests/integration/components/tree-view-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | tree view', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders and expands', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', [{
        broader: 'foo0',
        children: [{
          broader: 'foo2',
          children: [],
          label: 'foo2label',
          uuid: 'foo2'
        }],
        label: 'foo1label',
        uuid: 'foo1'
      }, {
        broader: 'bar0',
        children: [],
        label: 'bar1label',
        uuid: 'bar1'
      }]);
      this.set('selected', [{
        identifier: 'bar1'
      }]);
      this.set('select', function () {
        assert.ok(true, 'called select');
      }); // Handle any actions with this.on('myAction', function(val) { ... });

      assert.expect(7);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{tree-view model=model selected=selected}}
      */
      {
        "id": "Rckdh0yQ",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"model\",\"selected\"],[[35,1],[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"selected\",\"model\",\"tree-view\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.tree-trunk').innerText.replace(/[\s\n]+/g, '|'), '|bar1label|foo1label');
      assert.dom('.tree-leaf').hasClass('tree-highlight', 'selected leaf highlighted');
      assert.dom('.tree-leaf .expand-icon').exists({
        count: 1
      }, 'node expand icon rendered');
      await (0, _testHelpers.click)((0, _testHelpers.find)('.expand-icon'));
      assert.dom('.tree-leaf').exists({
        count: 3
      }, 'node expanded'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#tree-view model=model select=select}}
              template block text
            {{/tree-view}}
          
      */
      {
        "id": "tD9QrX9X",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,2],null,[[\"model\",\"select\"],[[35,1],[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"select\",\"model\",\"tree-view\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.tree-trunk').innerText.replace(/[\s\n]+/g, '|'), '|bar1label|foo1label|foo2label');
      await (0, _testHelpers.click)((0, _testHelpers.findAll)('.tree-leaf')[1]);
      assert.dom('.tree-leaf.tree-highlight').exists({
        count: 2
      }, 'node selected');
    });
  });
});
define("mdeditor/tests/integration/helpers/object-is-empty-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Helper | object-is-empty', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object-is-empty inputValue}}
      */
      {
        "id": "5+vGzmTL",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],[[35,0]],null]]],\"hasEval\":false,\"upvars\":[\"inputValue\",\"object-is-empty\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), "false");
    });
  });
});
define("mdeditor/tests/integration/helpers/present-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('helper:present', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>{{present inputValue}}</section>
      */
      {
        "id": "OL2BH1DQ",
        "block": "{\"symbols\":[],\"statements\":[[10,\"section\"],[12],[1,[30,[36,1],[[35,0]],null]],[13]],\"hasEval\":false,\"upvars\":[\"inputValue\",\"present\"]}",
        "meta": {}
      }));
      assert.dom('section').hasText('true');
    });
  });
});
define("mdeditor/tests/integration/helpers/word-limit-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('helper:word-limit', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum, neque
      nec sagittis maximus, lacus lectus placerat libero, finibus varius arcu enim
      eget ante. Duis.`);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>{{word-limit inputValue limit=20 wordLength=10}}</section>
      */
      {
        "id": "/o4FWcrT",
        "block": "{\"symbols\":[],\"statements\":[[10,\"section\"],[12],[1,[30,[36,1],[[35,0]],[[\"limit\",\"wordLength\"],[20,10]]]],[13]],\"hasEval\":false,\"upvars\":[\"inputValue\",\"word-limit\"]}",
        "meta": {}
      }));
      assert.dom('section').hasText(`Lorem ipsum dolor sit amet,  consectetu... adipiscing...elit. Etiam rutrum, neque nec sagittis maximus, lacus lectus placerat libero, finibus varius ...`);
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-alert-table/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-tooltips/test-support/dom"], function (_qunit, _emberQunit, _testHelpers, _dom) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md-alert-table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-alert-table
            title="Foos"
            required=true
            tipMessage="Biz is baz."
          }}
      */
      {
        "id": "KuSRJ3SK",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,0],null,[[\"title\",\"required\",\"tipMessage\"],[\"Foos\",true,\"Biz is baz.\"]]]]],\"hasEval\":false,\"upvars\":[\"control/md-alert-table\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), 'No|Foos|found.|Add|Foo|');
      await (0, _testHelpers.triggerEvent)('.md-danger.ember-tooltip-target', 'mouseenter');
      (0, _dom.assertTooltipContent)(assert, {
        contentString: 'Biz is baz.'
      });
      assert.dom('.md-alert-table.alert-danger').exists(); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-alert-table title="Bars"}}
              template block text
            {{/control/md-alert-table}}
          
      */
      {
        "id": "deyHWvPN",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,[[\"title\"],[\"Bars\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"control/md-alert-table\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Bars|found.|Add|Bar|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-button-confirm/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md button confirm', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-button-confirm}}
      */
      {
        "id": "vqyLJr0w",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"control/md-button-confirm\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('button').innerText.trim(), ''); // Template block usage:" + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-button-confirm}}
              template block text
            {{/control/md-button-confirm}}
          
      */
      {
        "id": "Nqy3o4dA",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"control/md-button-confirm\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('button').innerText.trim(), 'template block text');
    });
    (0, _qunit.test)('shows and cancels confirm', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      // Template block usage:" + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <a href="#">Test</a>
            {{#control/md-button-confirm}}
              Test
            {{/control/md-button-confirm}}
          
      */
      {
        "id": "SXnqJKu1",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n      \"],[10,\"a\"],[14,6,\"#\"],[12],[2,\"Test\"],[13],[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        Test\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"control/md-button-confirm\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('button').innerText.trim(), 'Test', 'renders button');
      await (0, _testHelpers.click)('button');
      assert.equal((0, _testHelpers.find)('button').innerText.trim(), 'Confirm', 'renders confirm');
      await (0, _testHelpers.triggerEvent)('button', 'blur');
      assert.equal((0, _testHelpers.find)('button').innerText.trim(), 'Test', 'cancels confirm');
    });
    (0, _qunit.test)('performs confirm action', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      this.set('externalAction', type => {
        assert.ok(type, `${type} called`);
      }); // Template block usage:" + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-button-confirm onConfirm=(action externalAction "onConfirm")}}
              Test
            {{/control/md-button-confirm}}
          
      */
      {
        "id": "8WdiqB0S",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,2],null,[[\"onConfirm\"],[[30,[36,1],[[32,0],[35,0],\"onConfirm\"],null]]],[[\"default\"],[{\"statements\":[[2,\"        Test\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"externalAction\",\"action\",\"control/md-button-confirm\"]}",
        "meta": {}
      }));
      await (0, _testHelpers.click)('button');
      await (0, _testHelpers.click)('button');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-button-modal/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/modal-asserts"], function (_testHelpers, _qunit, _emberQunit, _modalAsserts) {
  "use strict";

  (0, _modalAsserts.default)();
  (0, _qunit.module)('Integration | Component | control/md button modal', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-button-modal}}
      */
      {
        "id": "co3jhzPw",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"control/md-button-modal\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-button-modal').innerText.trim(), ''); // Template block usage:" + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-button-modal}}
              template block text
            {{/control/md-button-modal}}
          
      */
      {
        "id": "4CFZa0yj",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"control/md-button-modal\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-button-modal').innerText.trim(), 'template block text', 'block');
    });
    (0, _qunit.test)('shows modal and performs actions', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      // let modalDialogService = this.owner.lookup('service:modal-dialog');
      // modalDialogService.destinationElementId = 'test-div';
      this.set('externalAction', type => {
        assert.ok(type, `${type} called`);
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <div id='test-div'></div>
            {{#control/md-button-modal
                message="Hello" onConfirm=(action externalAction "confirm")
                onCancel=(action externalAction "cancel")}} Test
            {{/control/md-button-modal}}
          
      */
      {
        "id": "GyekW9N+",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n      \"],[10,\"div\"],[14,1,\"test-div\"],[12],[13],[2,\"\\n      \"],[6,[37,2],null,[[\"message\",\"onConfirm\",\"onCancel\"],[\"Hello\",[30,[36,1],[[32,0],[35,0],\"confirm\"],null],[30,[36,1],[[32,0],[35,0],\"cancel\"],null]]],[[\"default\"],[{\"statements\":[[2,\" Test\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"externalAction\",\"action\",\"control/md-button-modal\"]}",
        "meta": {}
      })); // click the button

      await (0, _testHelpers.click)('.md-button-modal');
      assert.isPresentOnce('.md-modal-overlay');
      await (0, _testHelpers.clearRender)();
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <div id='test-div'></div>
            {{#control/md-button-modal
              renderInPlace=true
              message="Hello" onConfirm=(action externalAction "confirm")
              onCancel=(action externalAction "cancel")}} Test
            {{/control/md-button-modal}}
          
      */
      {
        "id": "uFVo2FHw",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n      \"],[10,\"div\"],[14,1,\"test-div\"],[12],[13],[2,\"\\n      \"],[6,[37,2],null,[[\"renderInPlace\",\"message\",\"onConfirm\",\"onCancel\"],[true,\"Hello\",[30,[36,1],[[32,0],[35,0],\"confirm\"],null],[30,[36,1],[[32,0],[35,0],\"cancel\"],null]]],[[\"default\"],[{\"statements\":[[2,\" Test\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"externalAction\",\"action\",\"control/md-button-modal\"]}",
        "meta": {}
      })); // click the button

      await (0, _testHelpers.click)('.md-button-modal');
      await (0, _testHelpers.click)('.md-button-modal');
      assert.isAbsent('.md-modal-overlay'); // click the modal buttons

      await (0, _testHelpers.click)('.md-button-modal');
      let num = (0, _testHelpers.findAll)('.md-modal-buttons button').length;
      let i = 0;

      while (i < num) {
        await (0, _testHelpers.click)((0, _testHelpers.findAll)('.md-modal-buttons button')[i]);
        i++;
      }
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-button/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md-button', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('myAction', function (val) {
        assert.ok(val, 'Click action');
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-button text="Click me" click=(action myAction true)}}
      */
      {
        "id": "pwcakXNu",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"text\",\"click\"],[\"Click me\",[30,[36,1],[[32,0],[35,0],true],null]]]]]],\"hasEval\":false,\"upvars\":[\"myAction\",\"action\",\"control/md-button\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText('Click me');
      (0, _testHelpers.click)('.md-button'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-button}}
              template block text
            {{/control/md-button}}
          
      */
      {
        "id": "SEsCy4S9",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"control/md-button\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText('template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-contact-link/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_testHelpers, _qunit, _emberQunit, _createContact) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md contact link', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      var store = this.owner.lookup('service:store');
      this.set('contacts', this.owner.lookup('service:contacts'));
      store.createRecord('contact', (0, _createContact.default)(1)[0]); // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-contact-link contacts=contacts contactId=0}}
      */
      {
        "id": "+1yGk/JO",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"contacts\",\"contactId\"],[[35,0],0]]]]],\"hasEval\":false,\"upvars\":[\"contacts\",\"control/md-contact-link\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('a').innerText.trim(), 'Contact0', 'renders link'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-contact-link contacts=contacts contactId=0 block=true}}
              template block text
            {{/control/md-contact-link}}
          
      */
      {
        "id": "V1+BLCAc",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"contacts\",\"contactId\",\"block\"],[[35,0],0,true]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"contacts\",\"control/md-contact-link\"]}",
        "meta": {}
      }));
      assert.dom('a').hasText('template block text', 'renders as block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-contact-title/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_testHelpers, _qunit, _emberQunit, _createContact) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md contact title', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      var store = this.owner.lookup('service:store');
      store.createRecord('contact', (0, _createContact.default)(1)[0]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <span>{{control/md-contact-title contactId=0}}</span>
      */
      {
        "id": "LpqqepmU",
        "block": "{\"symbols\":[],\"statements\":[[10,\"span\"],[12],[1,[30,[36,0],null,[[\"contactId\"],[0]]]],[13]],\"hasEval\":false,\"upvars\":[\"control/md-contact-title\"]}",
        "meta": {}
      }));
      assert.dom('span').hasText('Contact0'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <div class="test1">
            {{#control/md-contact-title contactId=0 as |c|}}
              template block text {{c.title}}
            {{/control/md-contact-title}}
            </div>
          
      */
      {
        "id": "K9XzQ57C",
        "block": "{\"symbols\":[\"c\"],\"statements\":[[10,\"div\"],[14,0,\"test1\"],[12],[2,\"\\n\"],[6,[37,0],null,[[\"contactId\"],[0]],[[\"default\"],[{\"statements\":[[2,\"        template block text \"],[1,[32,1,[\"title\"]]],[2,\"\\n\"]],\"parameters\":[1]}]]],[2,\"      \"],[13],[2,\"\\n    \"]],\"hasEval\":false,\"upvars\":[\"control/md-contact-title\"]}",
        "meta": {}
      }));
      assert.dom('.test1').hasText('template block text Contact0');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-crud-buttons/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md crud buttons', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3); // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-crud-buttons allowCopy=true allowDelete=true}}
      */
      {
        "id": "fBnFcHmd",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,0],null,[[\"allowCopy\",\"allowDelete\"],[true,true]]]]],\"hasEval\":false,\"upvars\":[\"control/md-crud-buttons\"]}",
        "meta": {}
      }));
      await (0, _testHelpers.triggerEvent)('.md-crud-buttons', 'mouseenter');
      assert.equal((0, _testHelpers.find)('.md-crud-buttons').textContent.replace(/[ \n]+/g, '|'), '|Copy|Delete|'); // Template block usage:" + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-crud-buttons doSave=true allowCopy=true}}
              template block text
            {{/control/md-crud-buttons}}
          
      */
      {
        "id": "Xd8+3zHP",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,[[\"doSave\",\"allowCopy\"],[true,true]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"control/md-crud-buttons\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-crud-buttons').textContent.replace(/[ \n]+/g, '|'), '|Save|Cancel|Copy|template|block|text|', 'block, doSave');
      assert.dom('.md-crud-buttons .btn-success').isDisabled('save disabled');
    });
    (0, _qunit.test)('should trigger external action', async function (assert) {
      assert.expect(4); // test double for the external action

      this.set('externalAction', type => {
        assert.ok(type, `${type} called`);
      }); //enable save and delete

      this.set('model', {
        hasDirtyHash: true,
        canRevert: true
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-crud-buttons model=model doSave=(action externalAction
        'doSave') doCancel=(action externalAction 'doCancel') doCopy=(action
        externalAction 'doCopy') doDelete=(action externalAction 'doDelete') allowCopy=true allowDelete=true}}
      */
      {
        "id": "Z9iR+VWB",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,3],null,[[\"model\",\"doSave\",\"doCancel\",\"doCopy\",\"doDelete\",\"allowCopy\",\"allowDelete\"],[[35,2],[30,[36,1],[[32,0],[35,0],\"doSave\"],null],[30,[36,1],[[32,0],[35,0],\"doCancel\"],null],[30,[36,1],[[32,0],[35,0],\"doCopy\"],null],[30,[36,1],[[32,0],[35,0],\"doDelete\"],null],true,true]]]]],\"hasEval\":false,\"upvars\":[\"externalAction\",\"action\",\"model\",\"control/md-crud-buttons\"]}",
        "meta": {}
      })); // click the buttons

      await (0, _testHelpers.click)('.md-crud-buttons .btn-success');
      await (0, _testHelpers.click)('.md-crud-buttons .btn-warning');
      await (0, _testHelpers.click)('.md-crud-buttons .btn-info'); //we have to click delete twice to confirm

      await (0, _testHelpers.click)('.md-crud-buttons .btn-danger');
      await (0, _testHelpers.click)('.md-crud-buttons .btn-danger');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-definition/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md definition', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-definition title="foobar" text="bizbaz"}}
      */
      {
        "id": "xkG7D5jx",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,0],null,[[\"title\",\"text\"],[\"foobar\",\"bizbaz\"]]]]],\"hasEval\":false,\"upvars\":[\"control/md-definition\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), 'foobar|bizbaz|');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-definition title="foobar"}}
      */
      {
        "id": "pgwVkw2E",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,0],null,[[\"title\"],[\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"control/md-definition\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), 'foobar|Not|Defined|', 'no text'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-definition title="foobar"}}
              template block text
            {{/control/md-definition}}
          
      */
      {
        "id": "NDd2xLhU",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,[[\"title\"],[\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"control/md-definition\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), '|foobar|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-edit-table/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md-edit-table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('data', [Ember.Object.create({
        title: 'foo',
        type: 'bar'
      }), Ember.Object.create({
        title: 'biz',
        type: 'baz'
      })]);
      this.set('columns', [{
        propertyName: 'title',
        title: 'Title'
      }, {
        propertyName: 'type',
        title: 'Type'
      }]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-edit-table data=data dataColumns=columns rowBodyComponent="object/md-schema"}}
      */
      {
        "id": "13KX0aa6",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"data\",\"dataColumns\",\"rowBodyComponent\"],[[35,1],[35,0],\"object/md-schema\"]]]]],\"hasEval\":false,\"upvars\":[\"columns\",\"data\",\"control/md-edit-table\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \s\n]+/g, '|').trim(), '|Search:|Columns|Show|All|Hide|All|Restore|Defaults|Title|Type|Title|Type|Title|Type|foo|bar|Edit|Delete|biz|baz|Edit|Delete|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|500|Page:|1|');
      await (0, _testHelpers.click)('.md-row-buttons .btn-success');
      assert.dom('.md-schema').exists('expanded row');
      assert.dom('.md-schema input').hasValue('foo', 'render row contents');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-errors/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md errors', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3); // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('errors', [{
        title: 'Test',
        errors: [{
          dataPath: '/foo/biz',
          message: 'message1'
        }, {
          message: 'message2'
        }]
      }, {
        title: 'Test2',
        errors: []
      }]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-errors errors=errors}}
      */
      {
        "id": "keVMS5Sb",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"errors\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"errors\",\"control/md-errors\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-error-list').textContent.replace(/[ \n]+/g, '|').trim(), '|Test|0|message1|/foo/biz|1|message2|Test2|');
      assert.dom((0, _testHelpers.findAll)('.md-error-list .label')[1]).hasClass('label-danger', 'class applied'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-errors  errors=errors}}
              template block text
            {{/control/md-errors}}
          
      */
      {
        "id": "W5QWEchW",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"errors\"],[[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"errors\",\"control/md-errors\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-error-list').textContent.replace(/[ \n]+/g, '|').trim(), '|Test|0|message1|/foo/biz|1|message2|Test2|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-fiscalyear/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "ember-power-select/test-support", "ember-power-select/test-support/helpers", "moment"], function (_testHelpers, _qunit, _emberQunit, _testSupport, _helpers, _moment) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md fiscalyear', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-fiscalyear context=this}}
      */
      {
        "id": "0cGcq+rD",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,0],null,[[\"context\"],[[32,0]]]]]],\"hasEval\":false,\"upvars\":[\"control/md-fiscalyear\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select.md-fiscalyear').innerText.replace(/[\n]+/g, '|').trim(), 'Pick Fiscal Year|Pick a Fiscal Year');
    });
    (0, _qunit.test)('select a year', async function (assert) {
      assert.expect(3); // Set any properties with this.set('myProperty', 'value');

      this.set('end', null);
      this.set('start', null);
      this.set('settings', {
        data: {
          fiscalStartMonth: 1
        }
      }); // Handle any actions with this.on('myAction', function(val) { ... });

      var year = new Date().getFullYear();
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{input/md-datetime
              class="start"
              valuePath="start"
              model=this
              label="Start Date"
              placeholder="Enter start dateTime"
            }}
            {{input/md-datetime
              class="end"
              valuePath="end"
              model=this
              label="End Date"
            }}
            {{control/md-fiscalyear context=this settings=settings}}
      */
      {
        "id": "QOTwSp+m",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n      \"],[1,[30,[36,0],null,[[\"class\",\"valuePath\",\"model\",\"label\",\"placeholder\"],[\"start\",\"start\",[32,0],\"Start Date\",\"Enter start dateTime\"]]]],[2,\"\\n      \"],[1,[30,[36,0],null,[[\"class\",\"valuePath\",\"model\",\"label\"],[\"end\",\"end\",[32,0],\"End Date\"]]]],[2,\"\\n      \"],[1,[30,[36,2],null,[[\"context\",\"settings\"],[[32,0],[35,1]]]]]],\"hasEval\":false,\"upvars\":[\"input/md-datetime\",\"settings\",\"control/md-fiscalyear\"]}",
        "meta": {}
      }));
      await (0, _helpers.clickTrigger)('.md-fiscalyear');
      await (0, _testSupport.selectChoose)('.md-fiscalyear', year);
      assert.equal(this.end, (0, _moment.default)(year, 'YYYY').month(this.settings.data.fiscalStartMonth + 10).endOf('month').toISOString(), 'end set');
      assert.equal(this.start, (0, _moment.default)(year, 'YYYY').month(this.settings.data.fiscalStartMonth - 1).startOf('month').toISOString(), 'start set');
      this.set('settings.data.fiscalStartMonth', null);
      assert.dom('.md-fiscalyear .ember-power-select-trigger').hasAttribute('aria-disabled', 'true', 'disabled if fiscalStartMonth empty');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-import-csv/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md import csv', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3); // Set any properties with this.set('myProperty', 'value');

      this.set('progress', 0); // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-import-csv}}
      */
      {
        "id": "2hxUG3xN",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"control/md-import-csv\"]}",
        "meta": {}
      }));
      assert.dom('.md-import-picker').hasText('Click or Drop a CSV here.');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-import-csv isProcessing=true progress=progress}}
      */
      {
        "id": "dv0SLLhV",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"isProcessing\",\"progress\"],[true,[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"progress\",\"control/md-import-csv\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), '|Processing...|Stop|0%|Complete|', 'renders progressbar');
      this.set('progress', 57);
      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), '|Processing...|Stop|57%|Complete|', 'updates progressbar');
    });
    (0, _qunit.skip)('upload csv', async function (assert) {
      assert.ok();
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-indicator/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-tooltips/test-support/dom"], function (_qunit, _emberQunit, _testHelpers, _dom) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md-indicator', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2); // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      this.set('values', {
        foo: 'This',
        bar: 'warning'
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-indicator
            icon="sticky-note"
            title="Hello"
            note="${foo} is a ${bar}"
            values=values
            type="danger"}}
            
      */
      {
        "id": "dL6hIQtT",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"icon\",\"title\",\"note\",\"values\",\"type\"],[\"sticky-note\",\"Hello\",\"${foo} is a ${bar}\",[35,0],\"danger\"]]]],[2,\"\\n      \"]],\"hasEval\":false,\"upvars\":[\"values\",\"control/md-indicator\"]}",
        "meta": {}
      }));
      assert.dom('.md-indicator').isVisible({
        count: 1
      });
      await (0, _testHelpers.triggerEvent)('.md-indicator', 'mouseenter');
      (0, _dom.assertTooltipContent)(assert, {
        contentString: 'Hello\nThis is a warning'
      });
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-indicator/related/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/create-dictionary", "ember-tooltips/test-support/dom"], function (_qunit, _emberQunit, _testHelpers, _createDictionary, _dom) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md-indicator/related', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function (assert) {
      let router = Ember.Service.extend({
        transitionTo() {
          assert.ok(true, 'Transition started');
        },

        generateURL(route, models) {
          assert.equal(route, 'dictionary.show.edit.entity', 'route OK');
          assert.deepEqual(models, ['attribute1'], 'model ids OK');
        }

      });
      this.owner.register('service:-routing', router); //this.router=router;

      this.owner.setupRouter();
    });
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(6);
      this.set('values', {
        foo: 'attribute1',
        bar: 'codeName0'
      });
      this.set('dictionary', (0, _createDictionary.createDictionary)(1)[0].json.dataDictionary);
      this.set('model', this.dictionary.entity[0].attribute[0]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-indicator/related
            model=model
            route=true
            icon="cog"
            note="The attribute ${foo} has an associated domain: ${bar}."
            route="dictionary.show.edit.entity"
            values=values
            parent=dictionary
            relatedId="domainId"
            path="domain"
            title="Related Indicator Test"
            linkText="Go to Domain"
            type="warning"
            popperContainer="#ember-testing"
            routeIdPaths=(array "values.foo")
          }}
      */
      {
        "id": "+8y7Vuxm",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,4],null,[[\"model\",\"route\",\"icon\",\"note\",\"route\",\"values\",\"parent\",\"relatedId\",\"path\",\"title\",\"linkText\",\"type\",\"popperContainer\",\"routeIdPaths\"],[[35,3],true,\"cog\",\"The attribute ${foo} has an associated domain: ${bar}.\",\"dictionary.show.edit.entity\",[35,2],[35,1],\"domainId\",\"domain\",\"Related Indicator Test\",\"Go to Domain\",\"warning\",\"#ember-testing\",[30,[36,0],[\"values.foo\"],null]]]]]],\"hasEval\":false,\"upvars\":[\"array\",\"dictionary\",\"values\",\"model\",\"control/md-indicator/related\"]}",
        "meta": {}
      }));
      assert.dom('.md-indicator-related .md-indicator').isVisible({
        count: 1
      });
      assert.dom('.md-indicator .fa').hasClass('fa-cog');
      await (0, _testHelpers.triggerEvent)('.md-indicator-related .md-indicator', 'mouseenter');
      (0, _dom.assertTooltipContent)(assert, {
        contentString: `Related Indicator Test\nThe attribute attribute1 has an associated domain: codeName0.\nGo to Domain`
      });
      await (0, _testHelpers.click)('.btn');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-infotip/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md-infotip', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-infotip}}
      */
      {
        "id": "QCbqJNL/",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"control/md-infotip\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-infotip}}
              template block text
            {{/control/md-infotip}}
          
      */
      {
        "id": "d5B2VaS5",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"control/md-infotip\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-itis/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md itis', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3); // Set any properties with this.set('myProperty', 'value');

      this.set('taxonomy', {
        taxonomicClassification: []
      });
      this.set('taxa', [Ember.Object.create({
        "kingdom": "Animalia",
        "name": "Calotes rouxii",
        "rank": "Species",
        "tsn": "1055525",
        "taxonomy": [[{
          "rank": "Kingdom",
          "value": "Animalia",
          "order": 0,
          "tsn": "202423"
        }, {
          "rank": "Subkingdom",
          "value": "Bilateria",
          "order": 1,
          "tsn": "914154"
        }, {
          "rank": "Genus",
          "value": "Calotes",
          "order": 12,
          "tsn": "209043"
        }, {
          "rank": "Species",
          "value": "Calotes rouxii",
          "order": 13,
          "tsn": "1055525",
          "common": ["Roux's Forest Lizard", "Forest Blood Sucker"]
        }]],
        "common": [{
          "name": "Roux's Forest Lizard",
          "language": "English"
        }, {
          "name": "Forest Blood Sucker",
          "language": "English"
        }],
        "status": "valid"
      })]); // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-itis taxonomy=taxonomy}}
      */
      {
        "id": "q5AY9bE8",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"taxonomy\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"taxonomy\",\"control/md-itis\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-itis').textContent.replace(/[ \n]+/g, '|').trim(), '|Search|Value|Kingdom|(optional)|Select|a|kingdom.|Search|'); // await fillIn('.md-input-input input.ember-text-field', 'shark');
      // await click('button[type=submit]');
      // await settled();

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-itis taxonomy=taxonomy searchResult=taxa found=true}}
      */
      {
        "id": "WsJN0mDc",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"taxonomy\",\"searchResult\",\"found\"],[[35,1],[35,0],true]]]]],\"hasEval\":false,\"upvars\":[\"taxa\",\"taxonomy\",\"control/md-itis\"]}",
        "meta": {}
      }));
      assert.dom('.md-itis-taxalist').exists('renders search result');
      await (0, _testHelpers.click)('.md-itis-taxalist .list-group-item .btn-success');
      assert.dom('.md-itis-selectedlist .list-group-item').exists('renders selected item');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-json-button/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md json button', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('json', {
        foo: 'bar'
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-json-button}}
      */
      {
        "id": "AC1r9M2m",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"control/md-json-button\"]}",
        "meta": {}
      }));
      assert.dom('button').hasText('Preview JSON'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-json-button}}
              template block text
            {{/control/md-json-button}}
          
      */
      {
        "id": "Iv6sA0B/",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"control/md-json-button\"]}",
        "meta": {}
      }));
      assert.dom('button').hasText('template block text');
    });
    (0, _qunit.test)('render json modal', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('json', {
        foo: 'bar'
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-json-button json=json preview=true}}
      */
      {
        "id": "PRsH8m9/",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"json\",\"preview\"],[[35,0],true]]]]],\"hasEval\":false,\"upvars\":[\"json\",\"control/md-json-button\"]}",
        "meta": {}
      }));
      await (0, _testHelpers.click)('button.btn');
      assert.dom(document.querySelector('.md-jsmodal-container')).hasText('{"foo": "bar"}');
    });
    (0, _qunit.test)('render json slider', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('json', {
        foo: 'bar'
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-json-button json=json title="foobar"}}
            <div class="slider">
              {{#from-elsewhere name="md-slider-json" as |slider|}}
                <h3 class="text-info">{{slider.title}}</h3>
                <hr>
                {{component slider.body}}
              {{/from-elsewhere}}
            </div>
      */
      {
        "id": "nFj0IQQS",
        "block": "{\"symbols\":[\"slider\"],\"statements\":[[1,[30,[36,2],null,[[\"json\",\"title\"],[[35,1],\"foobar\"]]]],[2,\"\\n      \"],[10,\"div\"],[14,0,\"slider\"],[12],[2,\"\\n\"],[6,[37,3],null,[[\"name\"],[\"md-slider-json\"]],[[\"default\"],[{\"statements\":[[2,\"          \"],[10,\"h3\"],[14,0,\"text-info\"],[12],[1,[32,1,[\"title\"]]],[13],[2,\"\\n          \"],[10,\"hr\"],[12],[13],[2,\"\\n          \"],[1,[30,[36,0],[[32,1,[\"body\"]]],null]],[2,\"\\n\"]],\"parameters\":[1]}]]],[2,\"      \"],[13]],\"hasEval\":false,\"upvars\":[\"component\",\"json\",\"control/md-json-button\",\"from-elsewhere\"]}",
        "meta": {}
      }));
      await (0, _testHelpers.click)('button.btn');
      assert.equal((0, _testHelpers.find)('.slider').textContent.replace(/[ \n]+/g, '|').trim(), '|Viewing|JSON|for:|foobar|{"foo":|"bar"}|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-json-viewer/component-test", ["@ember/test-helpers", "jquery", "qunit", "ember-qunit"], function (_testHelpers, _jquery, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md json viewer', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('render json modal', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('json', {
        foo: 'bar'
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-json-viewer json=json}}
      */
      {
        "id": "tSgX0ZYb",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"json\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"json\",\"control/md-json-viewer\"]}",
        "meta": {}
      }));
      assert.equal((0, _jquery.default)('.md-jsmodal-container').text().trim(), '{"foo": "bar"}');
    });
    (0, _qunit.test)('render json viewer', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('json', {
        foo: 'bar'
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-json-viewer json=json modal=false}}
      */
      {
        "id": "ePFDCj9z",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"json\",\"modal\"],[[35,0],false]]]]],\"hasEval\":false,\"upvars\":[\"json\",\"control/md-json-viewer\"]}",
        "meta": {}
      }));
      assert.dom('.md-json-viewer').hasText('{"foo": "bar"}');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-modal/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/modal-asserts"], function (_testHelpers, _qunit, _emberQunit, _modalAsserts) {
  "use strict";

  (0, _modalAsserts.default)();
  (0, _qunit.module)('Integration | Component | control/md modal', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-modal isShowing=true message="The message."}}
      */
      {
        "id": "/RTDHqMI",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,0],null,[[\"isShowing\",\"message\"],[true,\"The message.\"]]]]],\"hasEval\":false,\"upvars\":[\"control/md-modal\"]}",
        "meta": {}
      }));
      assert.ok(document.querySelector('.md-modal-container'));
      assert.dom(document.querySelector('.md-modal-container')).hasText('The message.'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-modal isShowing=true}}
              template block text
            {{/control/md-modal}}
          
      */
      {
        "id": "d8k1wKkE",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,[[\"isShowing\"],[true]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"control/md-modal\"]}",
        "meta": {}
      }));
      assert.isPresentOnce('.md-modal-overlay');
      assert.dom(document.querySelector('.md-modal-container')).hasText('template block text');
    });
    (0, _qunit.test)('shows modal and performs actions', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      this.showModal = false;
      assert.expect(3);
      this.set('externalAction', type => {
        assert.ok(type, `${type} called`);
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
              {{control/md-button
                class="btn btn-danger"
                icon="times"
                text="Test"
                click=(action (mut showModal) true)
              }}
              {{control/md-modal
                message="The modal message."
                confirm=(action externalAction "confirm")
                showCancel=true
                cancelType="primary"
                showConfirm=true
                confirmLabel="Confirm"
                confirmType="danger"
                isShowing=showModal
                renderInPlace=true
              }}
            
      */
      {
        "id": "fPSNHYkn",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n        \"],[1,[30,[36,3],null,[[\"class\",\"icon\",\"text\",\"click\"],[\"btn btn-danger\",\"times\",\"Test\",[30,[36,2],[[32,0],[30,[36,1],[[35,0]],null],true],null]]]]],[2,\"\\n        \"],[1,[30,[36,5],null,[[\"message\",\"confirm\",\"showCancel\",\"cancelType\",\"showConfirm\",\"confirmLabel\",\"confirmType\",\"isShowing\",\"renderInPlace\"],[\"The modal message.\",[30,[36,2],[[32,0],[35,4],\"confirm\"],null],true,\"primary\",true,\"Confirm\",\"danger\",[35,0],true]]]],[2,\"\\n      \"]],\"hasEval\":false,\"upvars\":[\"showModal\",\"mut\",\"action\",\"control/md-button\",\"externalAction\",\"control/md-modal\"]}",
        "meta": {}
      }));
      await (0, _testHelpers.click)('.md-button');
      assert.isAbsent('.md-modal-overlay');
      let num = document.querySelectorAll('.md-modal-buttons button').length;
      let i = 0;

      while (i < num) {
        let el = document.querySelector('.md-modal-buttons').querySelectorAll('button')[i];
        await (0, _testHelpers.click)(el);
        i++;
      }

      assert.isAbsent('.ember-modal-dialog');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-record-table/buttons/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md record table/buttons', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(4); // Set any properties with this.set('myProperty', 'value');

      this.set('model', {
        hasDirtyHash: true,
        hasSchemaErrors: true
      }); // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-record-table/buttons record=model}}
      */
      {
        "id": "yHrBH/dk",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"record\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"control/md-record-table/buttons\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-dashboard-buttons').textContent.replace(/[ \n]+/g, '|').trim(), '|Show|Edit|Delete|Preview|JSON|');
      assert.dom('.md-status-icon .btn-danger').isVisible();
      assert.dom('.md-status-icon .btn-warning').isVisible(); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{#control/md-record-table/buttons}}
                template block text
              {{/control/md-record-table/buttons}}
      */
      {
        "id": "a6ef80Qi",
        "block": "{\"symbols\":[],\"statements\":[[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"          template block text\\n\"]],\"parameters\":[]}]]]],\"hasEval\":false,\"upvars\":[\"control/md-record-table/buttons\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-dashboard-buttons').textContent.replace(/[ \n]+/g, '|').trim(), '|Show|Edit|Delete|Preview|JSON|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-record-table/buttons/custom/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md record table/buttons/custom', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2);
      this.set('rec', {
        biz: 'baz'
      });
      this.set('column', {
        buttonConfig: {
          title: 'foobar',
          style: 'warning',
          action: function (rec) {
            assert.equal(rec.biz, 'baz', 'action fired');
          }
        }
      }); // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-record-table/buttons/custom column=column record=rec}}
      */
      {
        "id": "YhnbWCF0",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"column\",\"record\"],[[35,1],[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"rec\",\"column\",\"control/md-record-table/buttons/custom\"]}",
        "meta": {}
      }));
      assert.dom('button.btn-warning').hasText('foobar');
      (0, _testHelpers.click)('button.btn-warning');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-record-table/buttons/filter/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md record table/buttons/filter', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2);
      var items = ['foo', 'bar']; // Set any properties with this.set('myProperty', 'value');

      this.set('selectedItems', items); // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('deleteSelected', function (selectedItems) {
        assert.equal(selectedItems, items, 'fires action');
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-record-table/buttons/filter deleteSelected=deleteSelected selectedItems=selectedItems}}
      */
      {
        "id": "Ct89GsC4",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"deleteSelected\",\"selectedItems\"],[[35,1],[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"selectedItems\",\"deleteSelected\",\"control/md-record-table/buttons/filter\"]}",
        "meta": {}
      }));
      assert.dom('button.btn-danger').hasText('Delete Selected');
      (0, _testHelpers.doubleClick)('button.btn-danger');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-record-table/buttons/show/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md record table/buttons/show', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-record-table/buttons/show}}
      */
      {
        "id": "NzxKsf5a",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"control/md-record-table/buttons/show\"]}",
        "meta": {}
      }));
      assert.dom('.btn-info').hasText('Show');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-record-table/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md record table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('data', [{
        title: 'foo',
        type: 'bar'
      }, {
        title: 'biz',
        type: 'baz'
      }]);
      this.set('columns', [{
        propertyName: 'title',
        title: 'Title'
      }, {
        propertyName: 'type',
        title: 'Type'
      }]); // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-record-table dataColumns=columns data=data}}
      */
      {
        "id": "NRTaunNK",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"dataColumns\",\"data\"],[[35,1],[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"data\",\"columns\",\"control/md-record-table\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-record-table').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|Search:|Columns|Show|All|Hide|All|Restore|Defaults|Title|Type|Actions|Title|Type|Actions|Title|Type|foo|bar|Show|biz|baz|Show|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|500|Page:|1|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-record-table dataColumns=columns data=data}}
              template block text
            {{/control/md-record-table}}
          
      */
      {
        "id": "mZ9HrsaD",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,2],null,[[\"dataColumns\",\"data\"],[[35,1],[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"data\",\"columns\",\"control/md-record-table\"]}",
        "meta": {}
      }));
      assert.dom('.md-record-table').hasText('template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-repo-link/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/config/environment"], function (_testHelpers, _qunit, _emberQunit, _environment) {
  "use strict";

  const {
    APP: {
      repository,
      version
    }
  } = _environment.default;
  (0, _qunit.module)('Integration | Component | control/md repo link', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-repo-link}}
      */
      {
        "id": "A1w5Bcpn",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"control/md-repo-link\"]}",
        "meta": {}
      }));
      assert.dom('a').hasText(version);
      assert.dom('a').hasAttribute('href', `${repository}/tree/${version.substring(version.indexOf('+') + 1)}`, 'link ok'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-repo-link}}
              template block text
            {{/control/md-repo-link}}
          
      */
      {
        "id": "jzqehUw9",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"control/md-repo-link\"]}",
        "meta": {}
      }));
      assert.dom('a').hasText('template block text', 'block ok');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-scroll-into-view/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md-scroll-into-view', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-scroll-into-view}}
      */
      {
        "id": "O0lWm2Dy",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"control/md-scroll-into-view\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText(''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-scroll-into-view}}
              template block text
            {{/control/md-scroll-into-view}}
          
      */
      {
        "id": "Hckq5UXN",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"control/md-scroll-into-view\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText('template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-scroll-spy/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md scroll spy', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3); // Set any properties with this.set('myProperty', 'value');

      this.set('setScrollTo', function (target) {
        assert.equal(target, 'foo', 'calls action');
      }); // this.set('clickLink', function(){
      // });
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <div data-spy="Foo" id="foo1">Foo</div>
            <div data-spy="Bar" id="bar1">Bar</div>
            {{control/md-scroll-spy setScrollTo=setScrollTo}}
      */
      {
        "id": "hMIum6tl",
        "block": "{\"symbols\":[],\"statements\":[[10,\"div\"],[14,\"data-spy\",\"Foo\"],[14,1,\"foo1\"],[12],[2,\"Foo\"],[13],[2,\"\\n      \"],[10,\"div\"],[14,\"data-spy\",\"Bar\"],[14,1,\"bar1\"],[12],[2,\"Bar\"],[13],[2,\"\\n      \"],[1,[30,[36,1],null,[[\"setScrollTo\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"setScrollTo\",\"control/md-scroll-spy\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('ul').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|Foo|Bar|');
      await (0, _testHelpers.click)('ul a'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-scroll-spy setScrollTo=setScrollTo}}
              template block text
            {{/control/md-scroll-spy}}
          
      */
      {
        "id": "SrVymBuX",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"setScrollTo\"],[[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"setScrollTo\",\"control/md-scroll-spy\"]}",
        "meta": {}
      }));
      assert.dom('ul').hasText('template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-select-table/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md select table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3); // Set any properties with this.set('myProperty', 'value');

      this.set('data', [{
        title: 'foo',
        type: 'bar'
      }, {
        title: 'biz',
        type: 'baz'
      }]);
      this.set('columns', [{
        propertyName: 'title',
        title: 'Title'
      }, {
        propertyName: 'type',
        title: 'Type'
      }]);
      this.set('select', function (selected) {
        assert.equal(selected[0].title, 'foo', 'calls action');
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-select-table columns=columns data=data select=select}}
      */
      {
        "id": "KZMNRPlY",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,3],null,[[\"columns\",\"data\",\"select\"],[[35,2],[35,1],[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"select\",\"data\",\"columns\",\"control/md-select-table\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select-table').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|Search:|Columns|Show|All|Hide|All|Restore|Defaults|Title|Type|Title|Type|Title|Type|foo|bar|biz|baz|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|500|Page:|1|');
      (0, _testHelpers.click)('.md-select-table tbody tr'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-select-table}}
              template block text
            {{/control/md-select-table}}
          
      */
      {
        "id": "YIwmBaw9",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"control/md-select-table\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select-table').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|template|block|text|', 'block ok');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-spinner/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md spinner', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-spinner text="foobar" size="5"}}
      */
      {
        "id": "IIVqJxjV",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,0],null,[[\"text\",\"size\"],[\"foobar\",\"5\"]]]]],\"hasEval\":false,\"upvars\":[\"control/md-spinner\"]}",
        "meta": {}
      }));
      assert.dom('.md-spinner').hasText('foobar');
      assert.dom('.md-spinner .md-spinner-text').hasClass('size-5', 'adds class'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-spinner}}
              template block text
            {{/control/md-spinner}}
          
      */
      {
        "id": "difjAsmy",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"control/md-spinner\"]}",
        "meta": {}
      }));
      assert.dom('.md-spinner').hasText('template block text', 'block ok');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-spotlight/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md spotlight', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(4); // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      var spotlight = this.owner.lookup('service:spotlight');
      var scope = {
        foo: 'bar'
      };

      var close = function () {
        assert.equal(this.foo, 'bar', 'calls close action');
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <div id="foo">foobar</div>
            {{control/md-spotlight}}
      */
      {
        "id": "vRmkyBxI",
        "block": "{\"symbols\":[],\"statements\":[[10,\"div\"],[14,1,\"foo\"],[12],[2,\"foobar\"],[13],[2,\"\\n      \"],[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"control/md-spotlight\"]}",
        "meta": {}
      }));
      spotlight.setTarget('foo', close, scope);
      assert.ok(document.querySelector('.md-modal-overlay'), 'render overlay');
      assert.dom('#foo').hasText('foobar', 'render target');
      assert.dom('#foo').hasClass('md-spotlight-target', 'adds class');
      spotlight.setTarget('foo');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-status/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/md status', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        hasDirtyHash: true,
        hasSchemaErrors: false
      }); // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/md-status model=model}}
      */
      {
        "id": "PmpXCTqi",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"control/md-status\"]}",
        "meta": {}
      }));
      assert.dom('.md-status-icon .md-error').isVisible();
      this.set('model.hasDirtyHash', false);
      this.set('model.hasSchemaErrors', true);
      assert.dom('.md-status-icon .md-error').isNotVisible(); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/md-status model=model}}
              template block text
            {{/control/md-status}}
          
      */
      {
        "id": "TpwoLiCQ",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"model\"],[[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"control/md-status\"]}",
        "meta": {}
      }));
      assert.dom('.md-status-icon .md-warning').isVisible();
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/subbar-citation/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/subbar citation', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/subbar-citation text="foobar"}}
      */
      {
        "id": "zJ4LrSQ6",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,0],null,[[\"text\"],[\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"control/subbar-citation\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.btn-group-vertical').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|Select|a|Record|foobar|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/subbar-citation}}
              template block text
            {{/control/subbar-citation}}
          
      */
      {
        "id": "Tqdf+O2c",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"control/subbar-citation\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.btn-group-vertical').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|Select|a|Record|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/subbar-importcsv/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/subbar importcsv', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3); // Set any properties with this.set('myProperty', 'value');

      var Target = Ember.Route.extend({
        actions: {
          doImport() {
            assert.ok(true, 'calls target action');
          }

        }
      });
      this.set('foo', Target.create({})); // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/subbar-importcsv class="importcsv" actionContext=foo}}
      */
      {
        "id": "hMihdqyQ",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"class\",\"actionContext\"],[\"importcsv\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"foo\",\"control/subbar-importcsv\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.importcsv').textContent.replace(/[ \n]+/g, '|').trim(), '|Do|Import|Cancel|Import|');
      (0, _testHelpers.click)('.importcsv .btn-info'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/subbar-importcsv class="importcsv"}}
              template block text
            {{/control/subbar-importcsv}}
          
      */
      {
        "id": "ktesIorx",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,[[\"class\"],[\"importcsv\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"control/subbar-importcsv\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.importcsv').textContent.replace(/[ \n]+/g, '|').trim(), '|Do|Import|Cancel|Import|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/subbar-link/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/subbar link', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3); // Set any properties with this.set('myProperty', 'value');

      this.set('test', function () {
        assert.ok(true, 'called action');
      }); // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/subbar-link  text="foo" click=test}}
      */
      {
        "id": "WSv22BG7",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"text\",\"click\"],[\"foo\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"test\",\"control/subbar-link\"]}",
        "meta": {}
      }));
      assert.dom('button').hasText('foo');
      await (0, _testHelpers.click)('button'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/subbar-link text="foo" click=test}}
              <section>template block text</section>
            {{/control/subbar-link}}
          
      */
      {
        "id": "RIbR2g6O",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"text\",\"click\"],[\"foo\",[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        \"],[10,\"section\"],[12],[2,\"template block text\"],[13],[2,\"\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"test\",\"control/subbar-link\"]}",
        "meta": {}
      }));
      assert.dom('section').hasText('template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/subbar-spatial/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | control/subbar spatial', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/subbar-spatial class="testme"}}
      */
      {
        "id": "Ut9nkk44",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,0],null,[[\"class\"],[\"testme\"]]]]],\"hasEval\":false,\"upvars\":[\"control/subbar-spatial\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|Zoom|All|Import|Features|Export|Features|Delete|All|Back|to|List|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#control/subbar-spatial class="testme"}}
              template block text
            {{/control/subbar-spatial}}
          
      */
      {
        "id": "6yMbWtS1",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,[[\"class\"],[\"testme\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"control/subbar-spatial\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|Zoom|All|Import|Features|Export|Features|Delete|All|Back|to|List|template|block|text|');
    });
    (0, _qunit.test)('fire actions', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      assert.expect(5);
      this.setProperties({
        test1: function () {
          assert.ok(true, 'called zoomAll');
        },
        test2: function () {
          assert.ok(true, 'called uploadData');
        },
        test3: function () {
          assert.ok(true, 'called exportGeoJSON');
        },
        test4: function () {
          assert.ok(true, 'called deleteAllFeatures');
        },
        test5: function () {
          assert.ok(true, 'called toList');
        }
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{control/subbar-spatial
            zoomAll=test1
            uploadData=test2
            exportGeoJSON=test3
            deleteAllFeatures=test4
            toList=test5
          }}
      */
      {
        "id": "iyWW7I59",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,5],null,[[\"zoomAll\",\"uploadData\",\"exportGeoJSON\",\"deleteAllFeatures\",\"toList\"],[[35,4],[35,3],[35,2],[35,1],[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"test5\",\"test4\",\"test3\",\"test2\",\"test1\",\"control/subbar-spatial\"]}",
        "meta": {}
      }));
      (0, _testHelpers.findAll)('button').forEach(async btn => await (0, _testHelpers.click)(btn));
      await (0, _testHelpers.doubleClick)('.btn-danger');
    });
  });
});
define("mdeditor/tests/integration/pods/components/ember-tooltip/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "ember-tooltips/test-support"], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  (0, _qunit.module)('Integration | Component | ember-tooltip', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{ember-tooltip}}
      */
      {
        "id": "h4ORIMuG",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"ember-tooltip\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText(''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#ember-tooltip isShown="true"}}
              template block text
            {{/ember-tooltip}}
          
      */
      {
        "id": "e4hXBXzi",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,[[\"isShown\"],[\"true\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"ember-tooltip\"]}",
        "meta": {}
      }));
      (0, _testSupport.assertTooltipContent)(assert, {
        contentString: 'template block text'
      });
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-boolean/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md boolean', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-boolean value=false text="Foo Bar" label="Baz" }}
      */
      {
        "id": "akrJXcXS",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,0],null,[[\"value\",\"text\",\"label\"],[false,\"Foo Bar\",\"Baz\"]]]]],\"hasEval\":false,\"upvars\":[\"input/md-boolean\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.form-group').textContent.replace(/[ \n]+/g, '|'), '|Baz|Foo|Bar|'); // Template block usage:" + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-boolean value=true text="Foo Bar" label="Baz"}}
              template block text
            {{/input/md-boolean}}
          
      */
      {
        "id": "z+ZIJx+G",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,[[\"value\",\"text\",\"label\"],[true,\"Foo Bar\",\"Baz\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"input/md-boolean\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.form-group').textContent.replace(/[ \n]+/g, '|'), '|Baz|Foo|Bar|template|block|text|');
      assert.dom('input').isChecked();
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-codelist-multi/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "ember-power-select/test-support/helpers"], function (_testHelpers, _qunit, _emberQunit, _helpers) {
  "use strict";

  const foobar = {
    codelist: [{
      code: '001',
      codeName: 'foo',
      description: 'This is foo.'
    }, {
      code: '002',
      codeName: 'bar',
      description: 'This is bar.'
    }]
  };
  const codelist = Ember.Service.extend({
    foobar: foobar
  });
  (0, _qunit.module)('Integration | Component | input/md codelist multi', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.actions = {};

      this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
    });
    hooks.beforeEach(function () {
      this.owner.register('service:codelist', codelist);
      this.codelist = this.owner.lookup('service:codelist');
    });
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      this.set('fooVal', ['foo', 'bar']); // Template block usage:" + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-codelist-multi
              mdCodeName="foobar"
              value=fooVal
            }}
              <p>template block text</p>
            {{/input/md-codelist-multi}}
          
      */
      {
        "id": "tqhhvoha",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"mdCodeName\",\"value\"],[\"foobar\",[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        \"],[10,\"p\"],[12],[2,\"template block text\"],[13],[2,\"\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"fooVal\",\"input/md-codelist-multi\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|×|bar|×|foo|', 'renders block with array value');
    });
    (0, _qunit.test)('set value action', async function (assert) {
      assert.expect(2); //this.set('fooVal', ['foo']);

      this.set('value', ['foo']);

      this.actions.update = actual => {
        assert.equal(actual, this.value, 'submitted value is passed to external action');
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-codelist-multi
            create=false
            value=value
            mdCodeName="foobar"
            change=(action "update" value)}}
      */
      {
        "id": "gY9n7xz7",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"create\",\"value\",\"mdCodeName\",\"change\"],[false,[35,0],\"foobar\",[30,[36,1],[[32,0],\"update\",[35,0]],null]]]]]],\"hasEval\":false,\"upvars\":[\"value\",\"action\",\"input/md-codelist-multi\"]}",
        "meta": {}
      }));
      await (0, _helpers.clickTrigger)();
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.find)('.ember-power-select-option'), 'mouseup');
      assert.equal((0, _testHelpers.getRootElement)().textContent.replace(/[ \n]+/g, '|'), '|×|bar|×|foo|bar|foo|', 'value updated');
    });
    (0, _qunit.test)('create option', async function (assert) {
      assert.expect(3);
      this.set('value', ['foo']);

      this.actions.update = actual => {
        assert.equal(actual, this.value, 'submitted value is passed to external action');
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-codelist-multi
            create=true
            value=value
            mdCodeName="foobar"
            change=(action "update" value)}}
      */
      {
        "id": "LRiSNcK3",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"create\",\"value\",\"mdCodeName\",\"change\"],[true,[35,0],\"foobar\",[30,[36,1],[[32,0],\"update\",[35,0]],null]]]]]],\"hasEval\":false,\"upvars\":[\"value\",\"action\",\"input/md-codelist-multi\"]}",
        "meta": {}
      }));
      await (0, _helpers.clickTrigger)();
      await (0, _helpers.typeInSearch)('biz');
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.find)('.ember-power-select-option'), 'mouseup');
      assert.equal((0, _testHelpers.getRootElement)().textContent.replace(/[ \n]+/g, '|'), '|×|foo|×|biz|bar|foo|biz|', 'value updated');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-codelist/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "ember-power-select/test-support", "ember-power-select/test-support/helpers"], function (_testHelpers, _qunit, _emberQunit, _testSupport, _helpers) {
  "use strict";

  const foobar = {
    codelist: [{
      code: '001',
      codeName: 'foo',
      description: 'This is foo.'
    }, {
      code: '002',
      codeName: 'bar',
      description: 'This is bar.'
    }]
  };
  const codelist = Ember.Service.extend({
    foobar: foobar
  });
  (0, _qunit.module)('Integration | Component | input/md-codelist', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.actions = {};

      this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
    });
    hooks.beforeEach(function () {
      this.owner.register('service:codelist', codelist);
      this.codelist = this.owner.lookup('service:codelist');
    });
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(1); // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-codelist
            value='foo' mdCodeName="foobar"}}
      */
      {
        "id": "m3Z167J1",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,0],null,[[\"value\",\"mdCodeName\"],[\"foo\",\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"input/md-codelist\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|foo|×|');
    });
    (0, _qunit.test)('set value action', async function (assert) {
      assert.expect(2);
      this.set('value', ['foo']);

      this.actions.update = actual => {
        assert.equal(actual, this.value, 'submitted value is passed to external action');
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-codelist
            value=value mdCodeName="foobar"
            change=(action "update" value)}}
      */
      {
        "id": "6/3Q7KGc",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"value\",\"mdCodeName\",\"change\"],[[35,0],\"foobar\",[30,[36,1],[[32,0],\"update\",[35,0]],null]]]]]],\"hasEval\":false,\"upvars\":[\"value\",\"action\",\"input/md-codelist\"]}",
        "meta": {}
      }));
      await (0, _testSupport.selectChoose)('.md-select', 'bar'); // return settled().then(() => {

      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|bar|×|', 'value updated'); // });
    });
    (0, _qunit.test)('create option', async function (assert) {
      assert.expect(2);
      this.set('value', ['foo']);

      this.actions.update = actual => {
        assert.equal(actual, this.value, 'submitted value is passed to external action');
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-codelist
            create=true
            value=value
            mdCodeName="foobar"
            change=(action "update" value)}}
      */
      {
        "id": "c0iYf9Ez",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"create\",\"value\",\"mdCodeName\",\"change\"],[true,[35,0],\"foobar\",[30,[36,1],[[32,0],\"update\",[35,0]],null]]]]]],\"hasEval\":false,\"upvars\":[\"value\",\"action\",\"input/md-codelist\"]}",
        "meta": {}
      }));
      await (0, _helpers.clickTrigger)();
      await (0, _helpers.typeInSearch)('biz');
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.find)('.ember-power-select-option'), 'mouseup'); //return settled().then(() => {

      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|biz|×|', 'value updated'); //});
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-date-range/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md date range', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('start', new Date('2016-01-01'));
      this.set('end', new Date('2017-01-01')); // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-date-range class="testme" startDateTime=start endDateTime=end profilePath="foobar"}}
      */
      {
        "id": "Pf98gLUS",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"class\",\"startDateTime\",\"endDateTime\",\"profilePath\"],[\"testme\",[35,1],[35,0],\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"end\",\"start\",\"input/md-date-range\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), 'Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|');
      assert.equal(new Date((0, _testHelpers.findAll)('.date input')[0].value).toISOString(), this.start.toISOString(), 'set start');
      assert.equal(new Date((0, _testHelpers.findAll)('.date input')[1].value).toISOString(), this.end.toISOString(), 'set end'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-date-range class="testme" startDateTime=start endDateTime=end profilePath="foobar"}}
              template block text
            {{/input/md-date-range}}
          
      */
      {
        "id": "CVIDheIQ",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,2],null,[[\"class\",\"startDateTime\",\"endDateTime\",\"profilePath\"],[\"testme\",[35,1],[35,0],\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"end\",\"start\",\"input/md-date-range\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), 'Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-datetime/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md datetime', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('renders and binds', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      this.set('mydate', '1999-12-31T23:59:59.999+0900');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-datetime
                            date=mydate
                            format="YYYY-MM-DD"
                            placeholder="Enter date"}}
      */
      {
        "id": "vRM8p2HI",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"date\",\"format\",\"placeholder\"],[[35,0],\"YYYY-MM-DD\",\"Enter date\"]]]]],\"hasEval\":false,\"upvars\":[\"mydate\",\"input/md-datetime\"]}",
        "meta": {}
      }));
      assert.dom('input').hasValue('1999-12-31', 'binding works');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-input-confirm/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md input confirm', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-input-confirm}}
      */
      {
        "id": "FqkEhXru",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"input/md-input-confirm\"]}",
        "meta": {}
      }));
      assert.dom('.md-input').hasText('Edit');
      assert.dom('.md-input input[disabled]').exists('input disabled');
      await (0, _testHelpers.click)('.btn-warning');
      assert.dom('.md-input').hasText('Confirm', 'confirm ok');
      await (0, _testHelpers.click)('.btn-warning');
      assert.dom('.md-input input:not([disabled])').exists('input enabled'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-input-confirm}}
              template block text
            {{/input/md-input-confirm}}
          
      */
      {
        "id": "tg6N6ap7",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"input/md-input-confirm\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-input').textContent.replace(/[ \n]+/g, '|').trim(), '|Edit|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-input/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md input', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{input/md-input
              label="Foo"
              value="Bar"
              maxlength=100
              required="true"
              inputClass="test"
              placeholder="Enter FooBar"}}
          
      */
      {
        "id": "LPikmntu",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n      \"],[1,[30,[36,0],null,[[\"label\",\"value\",\"maxlength\",\"required\",\"inputClass\",\"placeholder\"],[\"Foo\",\"Bar\",100,\"true\",\"test\",\"Enter FooBar\"]]]],[2,\"\\n    \"]],\"hasEval\":false,\"upvars\":[\"input/md-input\"]}",
        "meta": {}
      }));
      assert.dom('label').hasText('Foo', 'labeled OK');
      const input = this.$('input');
      const props = [input.prop('required'), input.prop('maxlength'), input.val(), input.prop('placeholder'), input.hasClass('test')];
      assert.deepEqual(props, [true, 100, 'Bar', 'Enter FooBar', true], 'properties set OK'); // Template block usage:" + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-input}}
              <p class="help-block">help text</p>
            {{/input/md-input}}
          
      */
      {
        "id": "TmtlG1tf",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        \"],[10,\"p\"],[14,0,\"help-block\"],[12],[2,\"help text\"],[13],[2,\"\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"input/md-input\"]}",
        "meta": {}
      }));
      assert.dom('.help-block').hasText('help text', 'block renders');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-markdown-area/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md markdown area', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      assert.expect(6);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-markdown-area required=true}}
      */
      {
        "id": "qHIhqxzJ",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,0],null,[[\"required\"],[true]]]]],\"hasEval\":false,\"upvars\":[\"input/md-markdown-area\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-markdown-editor').innerText.replace(/[ \n\s]+/g, '').trim(), '||||Entertext,Markdownissupported.​length:010');
      assert.dom('.md-markdown-editor .length.md-error').exists('required ok');
      this.set('markdownValue', 'This is foobar.');
      this.set('change', value => {
        assert.equal(value, this.markdownValue, `changed to ${this.markdownValue}`);
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-markdown-area
                value=markdownValue
                maxlength=10
                required=false
                change=(action change markdownValue)
              }}
      */
      {
        "id": "ccxsHdLR",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,3],null,[[\"value\",\"maxlength\",\"required\",\"change\"],[[35,0],10,false,[30,[36,2],[[32,0],[35,1],[35,0]],null]]]]]],\"hasEval\":false,\"upvars\":[\"markdownValue\",\"change\",\"action\",\"input/md-markdown-area\"]}",
        "meta": {}
      }));
      assert.dom('.md-markdown-editor .length.md-error').hasText('length: 15', 'maxlength ok');
      this.set('markdownValue', 'This is binbash.'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-markdown-area}}
              template block text
            {{/input/md-markdown-area}}
          
      */
      {
        "id": "/V4v/NMC",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"input/md-markdown-area\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-markdown-editor').innerText.replace(/[ \n\s]+/g, '').trim(), '||||Entertext,Markdownissupported.​length:010templateblocktext', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-month/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md month', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-month date="10"}}
      */
      {
        "id": "QXO1yAHG",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,0],null,[[\"date\"],[\"10\"]]]]],\"hasEval\":false,\"upvars\":[\"input/md-month\"]}",
        "meta": {}
      }));
      assert.dom('input').hasValue('October'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-month class="testme" date="10"}}
              template block text
            {{/input/md-month}}
          
      */
      {
        "id": "UVjEuC06",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,[[\"class\",\"date\"],[\"testme\",\"10\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"input/md-month\"]}",
        "meta": {}
      }));
      assert.dom('.testme').hasText('', 'no block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-select-contact/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_testHelpers, _qunit, _emberQunit, _createContact) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md select contact', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      var contacts = (0, _createContact.default)(3);
      var cs = this.owner.lookup('service:contacts');
      cs.set('contacts', contacts);
      this.set('contacts', contacts);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-select-contact value=1}}
      */
      {
        "id": "CNy0PYpO",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,0],null,[[\"value\"],[1]]]]],\"hasEval\":false,\"upvars\":[\"input/md-select-contact\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select-contact').textContent.replace(/[ \n]+/g, '|').trim(), '|Contact1|×|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-select-contact}}
              template block text
            {{/input/md-select-contact}}
          
      */
      {
        "id": "LKaS5G8y",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"input/md-select-contact\"]}",
        "meta": {}
      }));
      assert.dom('.md-select-contact').hasText('Select one option');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-select-contacts/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact", "ember-power-select/test-support"], function (_testHelpers, _qunit, _emberQunit, _createContact, _testSupport) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md select contacts', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-select-contacts}}
      */
      {
        "id": "rzPSksyB",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"input/md-select-contacts\"]}",
        "meta": {}
      }));
      assert.dom('.md-select-contact').exists();
    });
    (0, _qunit.test)('contact selected', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      //make sure there's at least one record visible
      //var store = this.owner.lookup('service:store');
      var contacts = (0, _createContact.default)(2);
      var cs = this.owner.lookup('service:contacts');
      cs.set('contacts', contacts); //store.createRecord('contact', contacts[0]);
      //store.createRecord('contact', contacts[1]);

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-select-contacts}}
      */
      {
        "id": "rzPSksyB",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"input/md-select-contacts\"]}",
        "meta": {}
      }));
      await (0, _testSupport.selectChoose)('.md-select-contact', 'Contact0');
      await (0, _testSupport.selectChoose)('.md-select-contact', 'Contact1');
      assert.equal((0, _testHelpers.find)('.md-select-contact').innerText.replace(/[\s\n]+/g, '|').trim(), '×|Contact0|×|Contact1', 'select multiple contacts');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-select-profile/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "ember-power-select/test-support/helpers", "mdeditor/config/environment"], function (_testHelpers, _qunit, _emberQunit, _helpers, _environment) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md select profile', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // test dummy for the external profile action
      this.set('updateProfile', () => {});
      this.set('profileId', _environment.default.APP.defaultProfileId);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-select-profile
            value=profileId
            updateProfile=updateProfile
            class="testme"
          }}
      */
      {
        "id": "RaQcQhba",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"value\",\"updateProfile\",\"class\"],[[35,1],[35,0],\"testme\"]]]]],\"hasEval\":false,\"upvars\":[\"updateProfile\",\"profileId\",\"input/md-select-profile\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|'), '|Profile|Full|?|');
    });
    (0, _qunit.test)('should trigger external action on change', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      // test dummy for the external profile action
      this.set('updateProfile', actual => {
        assert.equal(actual, _environment.default.APP.defaultProfileId, 'submitted value is passed to external action');
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-select-profile value=null updateProfile=(action updateProfile)}}
      */
      {
        "id": "XjM87Mmv",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"value\",\"updateProfile\"],[null,[30,[36,1],[[32,0],[35,0]],null]]]]]],\"hasEval\":false,\"upvars\":[\"updateProfile\",\"action\",\"input/md-select-profile\"]}",
        "meta": {}
      })); // select a value and force an onchange

      await (0, _helpers.clickTrigger)();
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.findAll)('.ember-power-select-option .select-value').findBy('innerText', 'Full'), 'mouseup');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-select-thesaurus/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "ember-power-select/test-support/helpers"], function (_testHelpers, _qunit, _emberQunit, _helpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md select thesaurus', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-select-thesaurus}}
      */
      {
        "id": "FQF6aOTH",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"input/md-select-thesaurus\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|Pick|a|thesaurus|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-select-thesaurus}}
              template block text
            {{/input/md-select-thesaurus}}
          
      */
      {
        "id": "GCiQWYNK",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"input/md-select-thesaurus\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|Pick|a|thesaurus|');
    });
    (0, _qunit.test)('should trigger external action on change', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      // test dummy for the external profile action
      this.set('selectThesaurus', id => {
        assert.equal(id.citation.identifier[0].identifier, '1eb0ea0a-312c-4d74-8d42-6f1ad758f999', 'submitted value is passed to external action');
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-select-thesaurus selectThesaurus=selectThesaurus}}
      */
      {
        "id": "km1GDQDz",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"selectThesaurus\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"selectThesaurus\",\"input/md-select-thesaurus\"]}",
        "meta": {}
      })); // select a value and force an onchange

      await (0, _helpers.clickTrigger)();
      (0, _testHelpers.triggerEvent)((0, _testHelpers.findAll)('.ember-power-select-option')[1], 'mouseup');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-select/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "ember-power-select/test-support/helpers"], function (_testHelpers, _qunit, _emberQunit, _helpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md select', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      this.set('objArray', [Ember.Object.create({
        id: 1,
        name: 'foo',
        tip: 'bar'
      })]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{input/md-select
              value=1
              objectArray=objArray
              valuePath="id"
              namePath="name"
              tooltipPath="tip"
              placeholder="Select one"}}
          
      */
      {
        "id": "Ai8wqy4R",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n      \"],[1,[30,[36,1],null,[[\"value\",\"objectArray\",\"valuePath\",\"namePath\",\"tooltipPath\",\"placeholder\"],[1,[35,0],\"id\",\"name\",\"tip\",\"Select one\"]]]],[2,\"\\n    \"]],\"hasEval\":false,\"upvars\":[\"objArray\",\"input/md-select\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|foo|', 'renders ok');
    });
    (0, _qunit.test)('set value', async function (assert) {
      assert.expect(3); // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      this.set('objArray', [Ember.Object.create({
        id: 1,
        name: 'foo',
        tip: 'bar'
      }), Ember.Object.create({
        id: 2,
        name: 'baz',
        tip: 'biz'
      })]);
      this.set('value', 1);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{input/md-select
              value=value
              objectArray=objArray
              valuePath="id"
              namePath="name"}}
          
      */
      {
        "id": "LuWkF+9X",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n      \"],[1,[30,[36,2],null,[[\"value\",\"objectArray\",\"valuePath\",\"namePath\"],[[35,1],[35,0],\"id\",\"name\"]]]],[2,\"\\n    \"]],\"hasEval\":false,\"upvars\":[\"objArray\",\"value\",\"input/md-select\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|foo|', 'value set');
      await (0, _helpers.clickTrigger)();
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.findAll)('.ember-power-select-option')[1], 'mouseup');
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|baz|', 'display value updates');
      assert.equal(this.value, 2, 'value is updated');
    });
    (0, _qunit.test)('create option', async function (assert) {
      assert.expect(3); // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      this.set('objArray', [Ember.Object.create({
        id: 1,
        name: 'foo',
        tip: 'bar'
      }), Ember.Object.create({
        id: 2,
        name: 'baz',
        tip: 'biz'
      })]);
      this.set('value', 1);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{input/md-select
              value=value
              create=true
              objectArray=objArray
              valuePath="id"
              namePath="name"}}
          
      */
      {
        "id": "VBP+LpgX",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n      \"],[1,[30,[36,2],null,[[\"value\",\"create\",\"objectArray\",\"valuePath\",\"namePath\"],[[35,1],true,[35,0],\"id\",\"name\"]]]],[2,\"\\n    \"]],\"hasEval\":false,\"upvars\":[\"objArray\",\"value\",\"input/md-select\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|foo|', 'value set');
      await (0, _helpers.clickTrigger)();
      await (0, _helpers.typeInSearch)('biz');
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.find)('.ember-power-select-option'), 'mouseup');
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|biz|', 'display value updates');
      assert.equal(this.value, 'biz', 'value is updated');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-textarea/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md textarea', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{input/md-textarea
            value="Foo bar baz"
            label="FooBar"
            placeholder="placeholder"
            rows=10}}
            
      */
      {
        "id": "7s+MiF0h",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n      \"],[1,[30,[36,0],null,[[\"value\",\"label\",\"placeholder\",\"rows\"],[\"Foo bar baz\",\"FooBar\",\"placeholder\",10]]]],[2,\"\\n      \"]],\"hasEval\":false,\"upvars\":[\"input/md-textarea\"]}",
        "meta": {}
      }));
      assert.dom('textarea').hasValue('Foo bar baz');
      assert.dom('label').hasText('FooBar', 'label renders'); // Template block usage:" + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-textarea class="testme"}}
              template block text
            {{/input/md-textarea}}
          
      */
      {
        "id": "yCtJkNNA",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,[[\"class\"],[\"testme\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"input/md-textarea\"]}",
        "meta": {}
      }));
      assert.dom('.testme').hasText('template block text', 'block renders');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-toggle/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | input/md toggle', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('value', false); // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{input/md-toggle
            value=this.value
            showLabels=true
            onToggle=(action (mut this.value))
            offLabel="No"
            onLabel="Yes"
          }}
      */
      {
        "id": "uEs1nIoh",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"value\",\"showLabels\",\"onToggle\",\"offLabel\",\"onLabel\"],[[32,0,[\"value\"]],true,[30,[36,1],[[32,0],[30,[36,0],[[32,0,[\"value\"]]],null]],null],\"No\",\"Yes\"]]]]],\"hasEval\":false,\"upvars\":[\"mut\",\"action\",\"input/md-toggle\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.x-toggle-component').textContent.replace(/[ \n]+/g, '|').trim(), '|No|Yes|');
      await (0, _testHelpers.click)('.x-toggle-btn');
      assert.dom('.toggle-on').exists('toggle on'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#input/md-toggle class="testme"}}
              template block text
            {{/input/md-toggle}}
          
      */
      {
        "id": "uyxsFFe5",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,[[\"class\"],[\"testme\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"input/md-toggle\"]}",
        "meta": {}
      }));
      assert.dom('.testme').hasText('template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-card/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | layout/md card', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-card title="foo"}}
      */
      {
        "id": "U6MD5ruM",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,0],null,[[\"title\"],[\"foo\"]]]]],\"hasEval\":false,\"upvars\":[\"layout/md-card\"]}",
        "meta": {}
      }));
      assert.dom('.md-card').hasText('foo'); // await render(hbs`{{layout/md-card title="foo" collasped="true"}}`);
      // assert.equal(find('.md-card').textContent.trim(), 'foo');
      // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/md-card}}
              template block text
            {{/layout/md-card}}
          
      */
      {
        "id": "fRPYX80K",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"layout/md-card\"]}",
        "meta": {}
      }));
      assert.dom('.md-card').hasText('template block text', 'block');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/md-card title="foo" collapsed=true collapsible=true}}
              template block text
            {{/layout/md-card}}
          
      */
      {
        "id": "Tpdi6RdR",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,[[\"title\",\"collapsed\",\"collapsible\"],[\"foo\",true,true]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"layout/md-card\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-card').innerText.trim(), 'foo', 'collapsed');
      assert.dom('.md-card .card-block:not(.in)').exists('class ok');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-footer/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | layout/md footer', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('settings', {
        data: {
          autoSave: false
        }
      });
      this.set('percent', 9.02);
      this.set('isOverThreshold', true);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-footer settings=settings percent=percent isOverThreshold=isOverThreshold}}
      */
      {
        "id": "qxBD6xd3",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,3],null,[[\"settings\",\"percent\",\"isOverThreshold\"],[[35,2],[35,1],[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"isOverThreshold\",\"percent\",\"settings\",\"layout/md-footer\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-footer').textContent.replace(/[ \n]+/g, '|').trim(), '|Report|Issue|:|9.02|%|AutoSave:|Off|');
      this.set('settings.data.autoSave', true);
      this.set('percent', 10.54);
      this.set('isOverThreshold', false); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/md-footer settings=settings percent=percent isOverThreshold=isOverThreshold}}
              template block text
            {{/layout/md-footer}}
          
      */
      {
        "id": "znj7EWFL",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,3],null,[[\"settings\",\"percent\",\"isOverThreshold\"],[[35,2],[35,1],[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"isOverThreshold\",\"percent\",\"settings\",\"layout/md-footer\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-footer').textContent.replace(/[ \n]+/g, '|').trim(), '|Report|Issue|:|10.54|%|AutoSave:|On|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-nav-main/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | md nav main', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2); // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-nav-main}}
      */
      {
        "id": "+DaIXbMk",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"layout/md-nav-main\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('nav').innerText.replace(/[ \n]+/g, '|'), '|Dashboard|Export|Import|Publish|Settings'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/md-nav-main}}
              template block text
            {{/layout/md-nav-main}}
          
      */
      {
        "id": "l2eUIkFn",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"layout/md-nav-main\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('nav').innerText.replace(/[ \n]+/g, '|'), '|Dashboard|Export|Import|Publish|template|block|text|Settings');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-nav-secondary/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  //Stub profile service
  const profiles = [{
    identifier: "full",
    namespace: "org.adiwg.profile",
    nav: {
      record: [{
        title: 'Foo',
        target: 'record.show.edit.index'
      }, {
        title: 'Bar',
        target: 'record.show.edit.metadata'
      }]
    }
  }, {
    identifier: 'basic',
    namespace: "org.adiwg.profile",
    nav: {
      record: [{
        title: 'FooBar',
        target: 'record.show.edit.index'
      }, {
        title: 'BarFoo',
        target: 'record.show.edit.metadata'
      }, {
        title: 'FooBar1',
        target: 'record.show.edit.index'
      }, {
        title: 'BarFoo2',
        target: 'record.show.edit.metadata'
      }]
    }
  }];
  const profileStub = Ember.Service.extend({
    coreProfiles: profiles
  });
  (0, _qunit.module)('Integration | Component | md nav secondary', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.owner.register('service:profile', profileStub); // Calling inject puts the service instance in the test's context,
      // making it accessible as "profileService" within each test

      this.profileService = this.owner.lookup('service:profile');
      this.customService = this.owner.lookup('service:custom-profile');
      this.model = {
        constructor: {
          modelName: 'record'
        }
      };
    });
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2); // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-nav-secondary model=model}}
      */
      {
        "id": "PY1SYRxZ",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"layout/md-nav-secondary\"]}",
        "meta": {}
      }));
      var more = (0, _testHelpers.findAll)('.overflow-nav').length ? '|More' : '';
      assert.equal((0, _testHelpers.find)('.nav').textContent.replace(/[ \n]+/g, '|'), more + '|Foo|Bar|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/md-nav-secondary model=model}}
              <li>template block text</li>
            {{/layout/md-nav-secondary}}
          
      */
      {
        "id": "Gy72XLPm",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"model\"],[[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        \"],[10,\"li\"],[12],[2,\"template block text\"],[13],[2,\"\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"layout/md-nav-secondary\"]}",
        "meta": {}
      }));
      more = (0, _testHelpers.findAll)('.overflow-nav').length ? '|More' : '';
      assert.equal((0, _testHelpers.find)('.nav').textContent.replace(/[ \n]+/g, '|'), more + '|Foo|Bar|');
    });
    (0, _qunit.test)('render after setting profile', async function (assert) {
      assert.expect(2); // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('customService.active', 'org.adiwg.profile.basic');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-nav-secondary model=model}}
      */
      {
        "id": "PY1SYRxZ",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"layout/md-nav-secondary\"]}",
        "meta": {}
      }));
      var more = (0, _testHelpers.findAll)('.overflow-nav').length ? '|More' : '';
      assert.equal((0, _testHelpers.find)('.nav').textContent.replace(/[ \n]+/g, '|'), more + '|FooBar|BarFoo|FooBar1|BarFoo2|');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <div style="width:100px;">{{layout/md-nav-secondary model=model}}</div>
      */
      {
        "id": "OWI/PvzN",
        "block": "{\"symbols\":[],\"statements\":[[10,\"div\"],[14,5,\"width:100px;\"],[12],[1,[30,[36,1],null,[[\"model\"],[[35,0]]]]],[13]],\"hasEval\":false,\"upvars\":[\"model\",\"layout/md-nav-secondary\"]}",
        "meta": {}
      }));
      assert.ok((0, _testHelpers.findAll)('.dropdown .dropdown-menu').length, 'render more dropdown');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-nav-secondary/link/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | layout/md-nav-secondary/link', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.links = [Ember.Object.create({
        title: 'Foo',
        target: 'record.show.edit.index',
        tip: 'Foo not bar'
      }), Ember.Object.create({
        title: 'Bar',
        target: 'record.show.edit.metadata'
      })];
      this.nav = {
        links: this.links
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-nav-secondary/link link=links.firstObject nav=nav}}
      */
      {
        "id": "LCnErCKN",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"link\",\"nav\"],[[35,1,[\"firstObject\"]],[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"nav\",\"links\",\"layout/md-nav-secondary/link\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText('Foo'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/md-nav-secondary/link link=links.lastObject nav=nav}}
              template block text
            {{/layout/md-nav-secondary/link}}
          
      */
      {
        "id": "wiHx4Nel",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,2],null,[[\"link\",\"nav\"],[[35,1,[\"lastObject\"]],[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"nav\",\"links\",\"layout/md-nav-secondary/link\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText('Bar');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-nav-sidebar/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact", "mdeditor/tests/helpers/create-record", "mdeditor/tests/helpers/create-dictionary"], function (_testHelpers, _qunit, _emberQunit, _createContact, _createRecord, _createDictionary) {
  "use strict";

  (0, _qunit.module)('Integration | Component | md nav sidebar', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(1);
      const contacts = (0, _createContact.default)(2);
      contacts.meta = {
        type: 'contact',
        list: 'contacts',
        title: 'Contacts'
      };
      const records = (0, _createRecord.default)(2);
      records.meta = {
        type: 'record',
        list: 'records',
        title: 'Records'
      };
      const dicts = (0, _createDictionary.createDictionary)(2);
      dicts.meta = {
        type: 'dictionary',
        list: 'dictionaries',
        title: 'Dictionaries'
      }; // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('model', [records, contacts, dicts]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-nav-sidebar items=model version="test"}}
      */
      {
        "id": "sL7pb9lE",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"items\",\"version\"],[[35,0],\"test\"]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"layout/md-nav-sidebar\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.sidebar-nav').textContent.replace(/[ \n]+/g, '|'), '|mdditorvtest|Records|(2)|My|Record0|My|Record1|Contacts|(2)|Contact0|Contact1|Dictionaries|(2)|My|Dictionary0|My|Dictionary1|');
    });
    (0, _qunit.test)('toggle help action', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-nav-sidebar}}
      */
      {
        "id": "YFgcAh+p",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"layout/md-nav-sidebar\"]}",
        "meta": {}
      }));
      await (0, _testHelpers.click)('.md-btn-help');
      assert.dom('.md-sidebar-wrapper').hasClass('help');
    });
    (0, _qunit.test)('toggle sidebar action', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <div id="md-wrapper">{{layout/md-nav-sidebar}}</div>
      */
      {
        "id": "5mhyCIra",
        "block": "{\"symbols\":[],\"statements\":[[10,\"div\"],[14,1,\"md-wrapper\"],[12],[1,[34,0]],[13]],\"hasEval\":false,\"upvars\":[\"layout/md-nav-sidebar\"]}",
        "meta": {}
      }));
      await (0, _testHelpers.click)('.sidebar-brand-link');
      assert.dom('#md-wrapper').hasClass('toggled');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-object-container/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | layout/md-object-container', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-object-container
            title="Foo"
            isCollapsible=true
            index="1"
          }}
      */
      {
        "id": "NiqBtvPZ",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,0],null,[[\"title\",\"isCollapsible\",\"index\"],[\"Foo\",true,\"1\"]]]]],\"hasEval\":false,\"upvars\":[\"layout/md-object-container\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText('Foo #1');
      assert.dom('.md-object-container').hasClass('even');
      await (0, _testHelpers.click)('.md-object-container-header a');
      assert.dom('.md-object-container .btn-collapse').hasClass('collapsed'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/md-object-container}}
              template block text
            {{/layout/md-object-container}}
          
      */
      {
        "id": "ST1QrR+0",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"layout/md-object-container\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText('template block text', 'block renders');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-slider/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | layout/md slider', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-slider}}
      */
      {
        "id": "ZljuUWee",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"layout/md-slider\"]}",
        "meta": {}
      }));
      assert.dom('.md-slider').hasText('Close'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/md-slider fromName="slider"}}
              template block text
            {{/layout/md-slider}}
            {{to-elsewhere named="slider"
              send=(hash
                title="biz"
                body=(component "layout/md-card" title="foobar"))
            }}
          
      */
      {
        "id": "bikw2yGT",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,[[\"fromName\"],[\"slider\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"      \"],[1,[30,[36,3],null,[[\"named\",\"send\"],[\"slider\",[30,[36,2],null,[[\"title\",\"body\"],[\"biz\",[30,[36,1],[\"layout/md-card\"],[[\"title\"],[\"foobar\"]]]]]]]]]],[2,\"\\n    \"]],\"hasEval\":false,\"upvars\":[\"layout/md-slider\",\"component\",\"hash\",\"to-elsewhere\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-slider').textContent.replace(/[ \n]+/g, '|').trim(), '|Close|biz|foobar|template|block|text|');
      assert.dom('.md-card').exists('rendered slider content');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-wrap/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | layout/md wrap', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/md-wrap class="testme"}}
      */
      {
        "id": "XM99w4Nf",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,0],null,[[\"class\"],[\"testme\"]]]]],\"hasEval\":false,\"upvars\":[\"layout/md-wrap\"]}",
        "meta": {}
      }));
      assert.dom('.testme').hasText(''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/md-wrap class="testme"}}
              template block text
            {{/layout/md-wrap}}
          
      */
      {
        "id": "H/8bpurQ",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,[[\"class\"],[\"testme\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"layout/md-wrap\"]}",
        "meta": {}
      }));
      assert.dom('.testme').hasText('template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/nav/dictionary/nav-main/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  // import Service from '@ember/service';
  //Stub profile service
  // const profiles = [{
  //     identifier: "full",
  //     namespace: "org.adiwg.profile",
  //     nav: {
  //       dictionary: [{
  //         title: 'Foo',
  //         target: 'record.show.edit.index'
  //
  //       }, {
  //         title: 'Bar',
  //         target: 'record.show.edit.metadata'
  //
  //       }]
  //     }
  //   },
  //   {
  //     identifier: 'basic',
  //     namespace: "org.adiwg.profile",
  //     nav: {
  //       dictionary: [{
  //         title: 'FooBar',
  //         target: 'record.show.edit.index'
  //
  //       }, {
  //         title: 'BarFoo',
  //         target: 'record.show.edit.metadata'
  //
  //       }]
  //     }
  //   }
  // ];
  // const profileStub = Service.extend({
  //   coreProfiles: profiles
  // });
  (0, _qunit.module)('Integration | Component | layout/nav/dictionary/nav-main', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks); // hooks.beforeEach(function () {
    //   this.owner.register('service:profile', profileStub);
    //   // Calling inject puts the service instance in the test's context,
    //   // making it accessible as "profileService" within each test
    //   this.profileService = this.owner.lookup('service:profile');
    //   this.customService = this.owner.lookup('service:custom-profile');
    //   this.model = {
    //     constructor: {
    //       modelName: 'record'
    //     }
    //   }
    // });

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/nav/dictionary/nav-main model=model}}
            {{to-elsewhere named="dictionary-nav" send=(component "control/md-button" text="testme")}}
            
      */
      {
        "id": "qr4S9Ie4",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\"],[[35,0]]]]],[2,\"\\n      \"],[1,[30,[36,3],null,[[\"named\",\"send\"],[\"dictionary-nav\",[30,[36,2],[\"control/md-button\"],[[\"text\"],[\"testme\"]]]]]]],[2,\"\\n      \"]],\"hasEval\":false,\"upvars\":[\"model\",\"layout/nav/dictionary/nav-main\",\"component\",\"to-elsewhere\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText('testme'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/nav/dictionary/nav-main model=model}}
              template block text
            {{/layout/nav/dictionary/nav-main}}
            {{to-elsewhere named="dictionary-nav" send=(component "control/md-button" text="testme")}}
          
      */
      {
        "id": "+a8mDtmP",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"model\"],[[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"      \"],[1,[30,[36,3],null,[[\"named\",\"send\"],[\"dictionary-nav\",[30,[36,2],[\"control/md-button\"],[[\"text\"],[\"testme\"]]]]]]],[2,\"\\n    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"layout/nav/dictionary/nav-main\",\"component\",\"to-elsewhere\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText('testme');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/nav/record/nav-main/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/config/environment"], function (_qunit, _emberQunit, _testHelpers, _environment) {
  "use strict";

  (0, _qunit.module)('Integration | Component | layout/nav/record/nav-main', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.foo = function () {};

      this.profileId = _environment.default.APP.defaultProfileId;
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{layout/nav/record/nav-main}}
          {{to-elsewhere named="record-nav" send=(component "input/md-select-profile" value=profileId updateProfile=this.foo)}}
          
      */
      {
        "id": "6qLgWQ79",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]],[2,\"\\n    \"],[1,[30,[36,3],null,[[\"named\",\"send\"],[\"record-nav\",[30,[36,2],[\"input/md-select-profile\"],[[\"value\",\"updateProfile\"],[[35,1],[32,0,[\"foo\"]]]]]]]]],[2,\"\\n    \"]],\"hasEval\":false,\"upvars\":[\"layout/nav/record/nav-main\",\"profileId\",\"component\",\"to-elsewhere\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Translate|Profile|Full|?|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#layout/nav/record/nav-main}}
              template block text
            {{/layout/nav/record/nav-main}}
          
      */
      {
        "id": "QSgNWTuH",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"layout/nav/record/nav-main\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText('Translate');
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-help/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | md help', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2); // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{md-help}}
      */
      {
        "id": "xyh0wVHr",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"md-help\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Help|Main|Tour|The|mdEditor|is|a|web|application|that|allows|users|to|author|and|edit|metadata|for|projects|and|datasets.|The|primary|design|goal|is|to|develop|an|editor|that|will|allow|creation|and|management|of|archival|quality|metadata|without|requiring|extensive|knowledge|of|metadata|standards.|A|comprehensive|User|Manual|is|available.|The|manual|includes|a|tutorial,|reference,|and|best|practices.|View|User|Manual|If|you|would|like|to|receive|announcements|regarding|the|mdEditor,|join|our|email|list!|Join|Email|list|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#md-help}}
              template block text
            {{/md-help}}
          
      */
      {
        "id": "32xioHmZ",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"md-help\"]}",
        "meta": {}
      }));
      assert.ok(this.element.textContent.trim().indexOf('template block text') > 0);
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-models-table/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | md models table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('data', [{
        title: 'foo',
        type: 'bar'
      }, {
        title: 'biz',
        type: 'baz'
      }]);
      this.set('columns', [{
        propertyName: 'title',
        title: 'Title'
      }, {
        propertyName: 'type',
        title: 'Type'
      }]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{md-models-table data=data columns=columns}}
      */
      {
        "id": "hK8PkSh2",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"data\",\"columns\"],[[35,1],[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"columns\",\"data\",\"md-models-table\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Search:|Columns|Show|All|Hide|All|Restore|Defaults|Title|Type|Title|Type|Title|Type|foo|bar|biz|baz|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|500|Page:|1|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#md-models-table}}
              template block text
            {{/md-models-table}}
          
      */
      {
        "id": "dP/T9gL5",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"md-models-table\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-models-table/components/check-all/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | md models table/components/check all', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(4); // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.data = {
        themeInstance: {
          'select-all-rows': 'select',
          'deselect-all-rows': 'deselect'
        },
        selectedItems: {
          length: 0
        },
        length: 1
      };

      this.toggleAllSelection = function () {
        assert.ok(true, 'toggleAll action');
        this.set('selectedItems.length', 1);
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{md-models-table/components/check-all data=data selectedItems=data.selectedItems themeInstance=data.themeInstance toggleAllSelection=toggleAllSelection}}
      */
      {
        "id": "iw3MgI1s",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"data\",\"selectedItems\",\"themeInstance\",\"toggleAllSelection\"],[[35,1],[35,1,[\"selectedItems\"]],[35,1,[\"themeInstance\"]],[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"toggleAllSelection\",\"data\",\"md-models-table/components/check-all\"]}",
        "meta": {}
      }));
      assert.dom('span').hasClass('deselect', 'add class');
      await (0, _testHelpers.click)('span'); // await render(hbs`{{md-models-table/components/check-all data=data themeInstance=data.themeInstance toggleAllSelection=toggleAllSelection}}`);

      assert.dom('span').hasClass('select', 'deselect'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#md-models-table/components/check-all}}
              template block text
            {{/md-models-table/components/check-all}}
          
      */
      {
        "id": "AWZKDqh/",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"md-models-table/components/check-all\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText('');
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-models-table/components/check/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | md models table/components/check', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.themeInstance = {
        'select-row': 'select',
        'deselect-row': 'deselect'
      };
      this.set('isSelected', false);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{md-models-table/components/check isSelected=isSelected themeInstance=themeInstance}}
      */
      {
        "id": "AhX63/WA",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"isSelected\",\"themeInstance\"],[[35,1],[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"themeInstance\",\"isSelected\",\"md-models-table/components/check\"]}",
        "meta": {}
      }));
      assert.dom('span').hasClass('deselect', 'add class');
      this.set('isSelected', true);
      assert.dom('span').hasClass('select', 'update class'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#md-models-table/components/check}}
              template block text
            {{/md-models-table/components/check}}
          
      */
      {
        "id": "YtICXwQ+",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"md-models-table/components/check\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText('');
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-models-table/components/row-body/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | md-models-table/components/row-body', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(1); // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      this.set('myAction', function () {
        assert.ok(true, 'call collapseRow');
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{md-models-table/components/row-body collapseRow=myAction}}
      */
      {
        "id": "8n7mqOxU",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"collapseRow\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"myAction\",\"md-models-table/components/row-body\"]}",
        "meta": {}
      }));
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-models-table/components/row-buttons/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | md-models-table/components/row-buttons', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(6); // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      this.set('myAction', function (col, index, record) {
        assert.equal(record.title, 'foo', 'called passed action');
        this.expandRow(index, record);
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{md-models-table/components/row-buttons}}
      */
      {
        "id": "T12/tRqf",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"md-models-table/components/row-buttons\"]}",
        "meta": {}
      }));
      this.set('data', [{
        title: 'foo',
        type: 'bar'
      }, {
        title: 'biz',
        type: 'baz'
      }]);
      this.set('columns', [{
        propertyName: 'title',
        title: 'Title'
      }, {
        propertyName: 'type',
        title: 'Type'
      }, {
        component: 'components/md-models-table/components/row-buttons',
        disableFiltering: true,
        disableSorting: true,
        mayBeHidden: false,
        className: 'text-center',
        buttons: [{
          title: 'foo',
          type: 'info',
          icon: 'house',
          action: this.myAction
        }, {
          title: 'biz',
          type: 'danger',
          icon: 'times',
          confirm: true,
          action: this.myAction
        }]
      }]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{md-models-table data=data columns=columns expandedRowComponent=(component "md-models-table/components/row-body" spotlighted=true)}}
      */
      {
        "id": "lPRiO4Ay",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,3],null,[[\"data\",\"columns\",\"expandedRowComponent\"],[[35,2],[35,1],[30,[36,0],[\"md-models-table/components/row-body\"],[[\"spotlighted\"],[true]]]]]]]],\"hasEval\":false,\"upvars\":[\"component\",\"columns\",\"data\",\"md-models-table\"]}",
        "meta": {}
      }));
      assert.dom('.md-row-buttons .btn').exists({
        count: 4
      });
      assert.dom('.md-row-buttons .btn-danger').exists({
        count: 2
      });
      assert.dom('.md-button-confirm').hasText('biz');
      assert.dom('.md-button-confirm.btn-danger .fa').hasClass('fa-times');
      await (0, _testHelpers.click)('.md-button-confirm');
      assert.dom('.md-button-confirm').hasText('Confirm');
      await (0, _testHelpers.click)('.btn-info');
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-title/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | md title', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{md-title}}
      */
      {
        "id": "he2fztQe",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"md-title\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText(''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#md-title}}
              template block text
            {{/md-title}}
          
      */
      {
        "id": "tUq68J8q",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"md-title\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText('template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-translate/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-record"], function (_testHelpers, _qunit, _emberQunit, _createRecord) {
  "use strict";

  (0, _qunit.module)('Integration | Component | md translate', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createRecord.default)(1)[0];
      this.isLoading = false;
      this.messages = null;
      this.result = null;
      this.writer = {
        type: 'json'
      };

      window.saveAs = function (blob, title) {
        assert.ok(title, 'save title');
        assert.equal(blob.constructor.name, 'Blob', 'save blob');
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{md-translate
            model=model
            isLoading=isLoading
            messages=messages
            result=result
            errorLevel=2
            isJson=true
            writeObj=writer
          }}
      */
      {
        "id": "iVzT47MG",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,5],null,[[\"model\",\"isLoading\",\"messages\",\"result\",\"errorLevel\",\"isJson\",\"writeObj\"],[[35,4],[35,3],[35,2],[35,1],2,true,[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"writer\",\"result\",\"messages\",\"isLoading\",\"model\",\"md-translate\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Options|Choose|Format|Select|one|option|Force|Valid|Ouput?|No|Yes|Show|Empty|Tags?|No|Yes|Translate|');
      this.set('isLoading', true);
      assert.dom('.md-spinner').exists('loading');
      this.set('messages', [["WARNING", " FGDC writer", " citation originator role is missing", " CONTEXT is lineage method"], ["WARNING", " FGDC writer", " citation publication date is missing", " CONTEXT is lineage method"]]);
      assert.equal((0, _testHelpers.find)('.md-translator-error').textContent.replace(/[\s\n]+/g, '|').trim(), '|Translation|Warning|Warning|ocurred|during|translation.|WARNING|citation|originator|role|is|missing|FGDC|writer|context|is|lineage|method|WARNING|citation|publication|date|is|missing|FGDC|writer|context|is|lineage|method|', 'messages');
      this.set('result', '{"foo":"bar"}');
      assert.equal((0, _testHelpers.find)('.md-translator-preview.warning').textContent.replace(/[\s\n]+/g, '|').trim(), '|Result|Preview|JSON|Format|Save|Result|', 'result');
      assert.dom('.md-translator-preview.warning textarea').hasValue('{"foo":"bar"}', 'textarea value set');
      (0, _testHelpers.click)('.md-translator-preview.warning .btn-success'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#md-translate}}
              template block text
            {{/md-translate}}
          
      */
      {
        "id": "6vwKZl/Q",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"md-translate\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Options|Choose|Format|Select|one|option|Force|Valid|Ouput?|No|Yes|Show|Empty|Tags?|No|Yes|Translate|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/models-table/cell-content-display/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | models-table/cell-content-display', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('column', {
        propertyName: 'title'
      });
      this.set('data', Ember.Object.create({
        title: 'foo biz baz',
        uri: 'bar'
      }));
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{models-table/cell-content-display column=column record=data}}
      */
      {
        "id": "wK0pxt37",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"column\",\"record\"],[[35,1],[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"data\",\"column\",\"models-table/cell-content-display\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText('foo biz baz');
      this.set('column1', {
        propertyName: 'title',
        truncate: true,
        wordLimit: 2
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{models-table/cell-content-display column=column1 record=data}}
      */
      {
        "id": "Vo6La+L8",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"column\",\"record\"],[[35,1],[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"data\",\"column1\",\"models-table/cell-content-display\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText('foo biz ...');
    });
  });
});
define("mdeditor/tests/integration/pods/components/models-table/row-expand/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | models-table/row-expand', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{models-table/row-expand}}
      */
      {
        "id": "F8cDIePn",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"models-table/row-expand\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText(''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#models-table/row-expand}}
              template block text
            {{/models-table/row-expand}}
          
      */
      {
        "id": "OFN6T65k",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"models-table/row-expand\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText('template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/models-table/table-body/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | models-table/table-body', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{models-table/table-body}}
      */
      {
        "id": "dSAKCqiD",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"models-table/table-body\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText(''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#models-table/table-body}}
              template block text
            {{/models-table/table-body}}
          
      */
      {
        "id": "5bGBJcp6",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"models-table/table-body\"]}",
        "meta": {}
      }));
      assert.dom(this.element).hasText('template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-address/md-address-block/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md address/md address block', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('address', {
        "addressType": ["mailing", "physical"],
        "description": "description",
        "deliveryPoint": ["deliveryPoint0", "deliveryPoint1"],
        "city": "city",
        "administrativeArea": "administrativeArea",
        "postalCode": "postalCode",
        "country": "country"
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-address/md-address-block item=address}}
      */
      {
        "id": "zIWvkTMJ",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"item\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"address\",\"object/md-address/md-address-block\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('address').textContent.replace(/[ \n]+/g, '|').trim(), '|deliveryPoint0|deliveryPoint1|city,|administrativeArea|postalCode|country|mailing,|physical|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-address/md-address-block item=address}}
              template block text
            {{/object/md-address/md-address-block}}
          
      */
      {
        "id": "d7vrtub4",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"item\"],[[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"address\",\"object/md-address/md-address-block\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('address').textContent.replace(/[ \n]+/g, '|').trim(), '|deliveryPoint0|deliveryPoint1|city,|administrativeArea|postalCode|country|mailing,|physical|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-allocation/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md allocation', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('allocation', {
        'amount': 9.9,
        'currency': 'currency',
        'sourceId': 'source',
        'recipientId': 'recipient',
        'matching': true,
        'comment': 'comment',
        sourceAllocationId: 'sourceAllocationId'
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-allocation profilePath="test" model=allocation}}
      */
      {
        "id": "VEa4T97T",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"test\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"allocation\",\"object/md-allocation\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-card').textContent.replace(/[ \n]+/g, '|').trim(), '|Amount|Amount|Currency|Choose|unit|of|currency|Award|ID|Source|Pick|contact|that|supplied|funds|Recipient|Pick|contact|that|received|funds|No|Other|Contacts|found.|Add|Other|Contact|Matching|Matching|funds|or|in-kind|services|Comment|No|Online|Resource|found.|Add|Online|Resource|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-allocation profilePath="test" model=allocation class="testme"}}
              template block text
            {{/object/md-allocation}}
          
      */
      {
        "id": "peFNUYF3",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"profilePath\",\"model\",\"class\"],[\"test\",[35,0],\"testme\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"allocation\",\"object/md-allocation\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|Amount|Amount|Currency|Choose|unit|of|currency|Award|ID|Source|Pick|contact|that|supplied|funds|Recipient|Pick|contact|that|received|funds|No|Other|Contacts|found.|Add|Other|Contact|Matching|Matching|funds|or|in-kind|services|Comment|No|Online|Resource|found.|Add|Online|Resource|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-array-table/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md array table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('data', [{
        biz: 'biz1',
        baz: 'baz1'
      }, {
        biz: 'biz2',
        baz: 'baz2'
      }]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-array-table
              columns="biz,baz"
              value=data
              title="FooBar"
              data-spy="FooBar" as |f|
            }}
              <td>
                {{f.item.biz}}
              </td>
              <td>
                {{f.item.baz}}
              </td>
            {{/object/md-array-table}}
            
      */
      {
        "id": "FWUbVu4E",
        "block": "{\"symbols\":[\"f\"],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"columns\",\"value\",\"title\",\"data-spy\"],[\"biz,baz\",[35,0],\"FooBar\",\"FooBar\"]],[[\"default\"],[{\"statements\":[[2,\"        \"],[10,\"td\"],[12],[2,\"\\n          \"],[1,[32,1,[\"item\",\"biz\"]]],[2,\"\\n        \"],[13],[2,\"\\n        \"],[10,\"td\"],[12],[2,\"\\n          \"],[1,[32,1,[\"item\",\"baz\"]]],[2,\"\\n        \"],[13],[2,\"\\n\"]],\"parameters\":[1]}]]],[2,\"      \"]],\"hasEval\":false,\"upvars\":[\"data\",\"object/md-array-table\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[ \n]+/g, '|').trim(), '|FooBars|2|Add|#|Biz|Baz|0|biz1|baz1|Delete|1|biz2|baz2|Delete|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-array-table
              columns="biz,baz"
              value=data
              title="FooBar"
            }}
              template block text
            {{/object/md-array-table}}
          
      */
      {
        "id": "T1ysv6Oa",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"columns\",\"value\",\"title\"],[\"biz,baz\",[35,0],\"FooBar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"data\",\"object/md-array-table\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[ \n]+/g, '|').trim(), '|FooBars|2|Add|#|Biz|Baz|0|template|block|text|Delete|1|template|block|text|Delete|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-associated/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md associated', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        "associationType": "product",
        "resourceCitation": {
          "title": "Pacific Connectivity Website",
          "date": [{
            "date": "2015-09-30T04:00:00.000Z",
            "dateType": "publication"
          }],
          "identifier": [{
            "authority": {
              "date": [{
                "date": "2018-01-30T19:09:24.029Z",
                "dateType": "published",
                "description": "Published using mdEditor"
              }],
              "title": "ScienceBase"
            },
            "identifier": "5a70c2dee4b0a9a2e9dafbe7",
            "namespace": "gov.sciencebase.catalog",
            "description": "Identifier imported from ScienceBase during publication"
          }]
        },
        "metadataCitation": {
          "title": "Metadata for Pacific Connectivity Website",
          "responsibleParty": [{
            "party": [{
              "contactId": "05413626-e57e-4121-9f15-39f5df4575fe"
            }],
            "role": "author"
          }],
          "identifier": [{
            "identifier": "f4abb4e0-a3d6-450f-adca-6d07eac19b0b",
            "namespace": "urn:uuid"
          }]
        },
        "resourceType": [{
          "type": "website"
        }, {
          "type": "product"
        }]
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-associated profilePath="foobar" model=model}}
      */
      {
        "id": "GaQMjill",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-associated\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Association|Type|product|?|×|Initiative|Type|Choose|Type|of|Initiative|Resource|Types|2|Add|#|Type|Name|0|website|?|×|Delete|1|product|?|×|Delete|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|Dates|1|Add|Date|#|Date|Date|Type|Description|0|publication|?|×|Delete|Edition|Presentation|Form|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Identifier|imported|from|ScienceBase|during|publication|More...|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Edit|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Edit|Delete|Series|Name|Issue|Page|No|Other|Details|found.|Add|Other|Detail|No|Graphic|found.|Add|Graphic|Metadata|Citation|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|Responsible|Parties|1|Add|#|Role|Contacts|0|author|?|×|Delete|No|Online|Resource|found.|Add|Online|Resource|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Not|Defined|More...|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Edit|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Edit|Delete|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-associated profilePath="foobar" model=model}}
              template block text
            {{/object/md-associated}}
          
      */
      {
        "id": "y4KFtzjY",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-associated\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Association|Type|product|?|×|Initiative|Type|Choose|Type|of|Initiative|Resource|Types|2|Add|#|Type|Name|0|website|?|×|Delete|1|product|?|×|Delete|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|Dates|1|Add|Date|#|Date|Date|Type|Description|0|publication|?|×|Delete|Edition|Presentation|Form|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Identifier|imported|from|ScienceBase|during|publication|More...|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Edit|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Edit|Delete|Series|Name|Issue|Page|No|Other|Details|found.|Add|Other|Detail|No|Graphic|found.|Add|Graphic|Metadata|Citation|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|Responsible|Parties|1|Add|#|Role|Contacts|0|author|?|×|Delete|No|Online|Resource|found.|Add|Online|Resource|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Not|Defined|More...|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Edit|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Edit|Delete|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-associated/preview/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md associated/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        "associationType": "product",
        "resourceCitation": {
          "title": "Pacific Connectivity Website",
          "date": [{
            "date": "2015-09-30T12:00:00.000Z",
            "dateType": "publication"
          }],
          "identifier": [{
            "authority": {
              "date": [{
                "date": "2018-01-30T12:00:00.000Z",
                "dateType": "published",
                "description": "Published using mdEditor"
              }],
              "title": "ScienceBase"
            },
            "identifier": "5a70c2dee4b0a9a2e9dafbe7",
            "namespace": "gov.sciencebase.catalog",
            "description": "Identifier imported from ScienceBase during publication"
          }]
        },
        "metadataCitation": {
          "title": "Metadata for Pacific Connectivity Website",
          "responsibleParty": [{
            "party": [{
              "contactId": "05413626-e57e-4121-9f15-39f5df4575fe"
            }],
            "role": "author"
          }],
          "identifier": [{
            "identifier": "f4abb4e0-a3d6-450f-adca-6d07eac19b0b",
            "namespace": "urn:uuid"
          }]
        },
        "resourceType": [{
          "type": "website"
        }, {
          "type": "product"
        }]
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-associated/preview item=model class="testme"}}
      */
      {
        "id": "ZHuO+Laj",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"item\",\"class\"],[[35,0],\"testme\"]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-associated/preview\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|Resource|#|Association|Type|product|Initiative|Type|Not|Defined|Title|Pacific|Connectivity|Website|Alternate|Titles|No|alternate|titles|assigned.|Dates|September|30th|2015|(publication)|Identifier|5a70c2dee4b0a9a2e9dafbe7|(gov.sciencebase.catalog)|Responsible|Party|No|responsibility|assigned.|Metadata|Identifier|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|(urn:uuid)|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-associated/preview item=model class="testme"}}
              template block text
            {{/object/md-associated/preview}}
          
      */
      {
        "id": "IUpt9rJ/",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"item\",\"class\"],[[35,0],\"testme\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-associated/preview\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|Resource|#|Association|Type|product|Initiative|Type|Not|Defined|Title|Pacific|Connectivity|Website|Alternate|Titles|No|alternate|titles|assigned.|Dates|September|30th|2015|(publication)|Identifier|5a70c2dee4b0a9a2e9dafbe7|(gov.sciencebase.catalog)|Responsible|Party|No|responsibility|assigned.|Metadata|Identifier|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|(urn:uuid)|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-attribute/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-dictionary"], function (_testHelpers, _qunit, _emberQunit, _createDictionary) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md attribute', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', (0, _createDictionary.createAttribute)(1)[0]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-attribute model=model profilePath="foobar"}}
      */
      {
        "id": "SBVjcVw6",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-attribute\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-card').textContent.replace(/[ \n]+/g, '|').trim(), '|Attribute|Information|Code|Name|Definition|Data|Type|dataType0|×|Allow|Null?|Allow|null|values|Common|Name|Domain|Select|or|enter|the|domain|for|this|attribute.|Aliases|1|Add|Alias|0|Delete|Units|Units|Resolution|Case|Sensitive?|Is|the|attribute|content|case|sensitive?|Field|Width|Missing|Value|Minimum|Value|Maximum|Value|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-attribute model=model profilePath="foobar"}}
              template block text
            {{/object/md-attribute}}
          
      */
      {
        "id": "w5lm1Jt/",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-attribute\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-card').textContent.replace(/[ \n]+/g, '|').trim(), '|Attribute|Information|Code|Name|Definition|Data|Type|dataType0|×|Allow|Null?|Allow|null|values|Common|Name|Domain|Select|or|enter|the|domain|for|this|attribute.|Aliases|1|Add|Alias|0|Delete|Units|Units|Resolution|Case|Sensitive?|Is|the|attribute|content|case|sensitive?|Field|Width|Missing|Value|Minimum|Value|Maximum|Value|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-attribute/preview/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-dictionary"], function (_testHelpers, _qunit, _emberQunit, _createDictionary) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md attribute/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', (0, _createDictionary.createAttribute)(1)[0]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <div class="testme">{{object/md-attribute/preview model=model profilePath="foobar"}}</div>
      */
      {
        "id": "yrYxy+wt",
        "block": "{\"symbols\":[],\"statements\":[[10,\"div\"],[14,0,\"testme\"],[12],[1,[30,[36,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]]]],[13]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-attribute/preview\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|dataType0|×|');
      assert.dom('.testme input').exists({
        count: 3
      }, 'render inputs');
      assert.dom('.testme .md-select').exists('render select');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-bbox/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md bbox', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        "westLongitude": -87.52179241764053,
        "eastLongitude": -85.30119385960293,
        "southLatitude": 29.640690610830635,
        "northLatitude": 30.42485959910817
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-bbox profilePath="foobar" model=model}}
      */
      {
        "id": "BdhPif1c",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-bbox\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.form').textContent.replace(/[ \n]+/g, '|').trim(), '|North|East|South|West|');
      var inputs = (0, _testHelpers.findAll)('input');
      assert.equal(inputs[0].value, this.model.northLatitude, 'north');
      assert.equal(inputs[1].value, this.model.eastLongitude, 'east');
      assert.equal(inputs[2].value, this.model.southLatitude, 'south');
      assert.equal(inputs[3].value, this.model.westLongitude, 'west'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-bbox profilePath="foobar" model=model}}
              template block text
            {{/object/md-bbox}}
          
      */
      {
        "id": "Znm5bpz7",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-bbox\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.form').textContent.replace(/[ \n]+/g, '|').trim(), '|North|East|South|West|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-citation-array/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-citation"], function (_testHelpers, _qunit, _emberQunit, _createCitation) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md citation array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('citation', (0, _createCitation.default)(3));
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-citation-array}}
      */
      {
        "id": "N8RUwbQX",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"object/md-citation-array\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[ \n]+/g, '|').trim(), '|No|Citation|found.|Add|Citation|');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-citation-array model=citation}}
      */
      {
        "id": "ARVu5wAp",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"citation\",\"object/md-citation-array\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[ \n]+/g, '|').trim(), '|Citation|3|Add|OK|#|Title|0|title0|More...|Delete|1|title1|More...|Delete|2|title2|More...|Delete|', 'renders rows'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-citation-array}}
              template block text
            {{/object/md-citation-array}}
          
      */
      {
        "id": "W8UVWvLo",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"object/md-citation-array\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[ \n]+/g, '|').trim(), '|No|Citation|found.|Add|Citation|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-citation/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-citation"], function (_testHelpers, _qunit, _emberQunit, _createCitation) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md citation', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('citation', (0, _createCitation.default)(1)[0]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-citation profilePath="foobar" model=citation}}
      */
      {
        "id": "lAppvf5s",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"citation\",\"object/md-citation\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Basic|Information|Title|Alternate|Titles|2|Add|Alternate|Title|0|Delete|1|Delete|Dates|2|Add|Date|#|Date|Date|Type|Description|0|dateType|×|Delete|1|dateType|×|Delete|Edition|Presentation|Form|×|presentationForm0|×|presentationForm1|Responsible|Parties|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Online|Resource|2|Add|OK|#|Name|Uri|0|Not|Defined|http://adiwg.org|Edit|Delete|1|Not|Defined|http://mdeditor.org|Edit|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier0|Not|Defined|Not|Defined|More...|Delete|1|identifier-0|Not|Defined|Not|Defined|More...|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Edit|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Edit|Delete|Series|Name|Issue|Page|Other|Details|2|Add|0|Delete|1|Delete|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName:|Edit|Delete|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-citation profilePath="foobar"}}
              template block text
            {{/object/md-citation}}
          
      */
      {
        "id": "PlvHvf/v",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,[[\"profilePath\"],[\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"object/md-citation\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|Edition|Presentation|Form|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|Series|Name|Issue|Page|No|Other|Details|found.|Add|Other|Detail|No|Graphic|found.|Add|Graphic|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-citation/preview/body/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-citation"], function (_testHelpers, _qunit, _emberQunit, _createCitation) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md citation/preview/body', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('citation', (0, _createCitation.default)(1)[0]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-citation/preview/body citation=citation}}
      */
      {
        "id": "luGQwXox",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"citation\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"citation\",\"object/md-citation/preview/body\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.row').textContent.replace(/[ \n]+/g, '|').trim(), '|Title|title0|Alternate|Titles|alternateTitle0|alternateTitle1|Dates|October|13th|2016|(dateType)|October|22nd|2016|(dateType)|Identifier|identifier0|identifier-0|Responsible|Party|role|(|)|role|(|)|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-citation/preview/body}}
              template block text
            {{/object/md-citation/preview/body}}
          
      */
      {
        "id": "VhPlte47",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"object/md-citation/preview/body\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.row').textContent.replace(/[ \n]+/g, '|').trim(), '|Title|Not|Defined|Alternate|Titles|No|alternate|titles|assigned.|Dates|No|dates|assigned.|Identifier|No|identifiers|assigned.|Responsible|Party|No|responsibility|assigned.|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-citation/preview/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-citation"], function (_testHelpers, _qunit, _emberQunit, _createCitation) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md citation/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3); // Set any properties with this.set('myProperty', 'value');

      this.set('citation', (0, _createCitation.default)(1)[0]);
      this.set('editCitation', function (v) {
        assert.ok(v, 'Called external action');
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-citation/preview editCitation=editCitation citation=citation}}
      */
      {
        "id": "VFHUr0j2",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"editCitation\",\"citation\"],[[35,1],[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"citation\",\"editCitation\",\"object/md-citation/preview\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-card').textContent.replace(/[ \n]+/g, '|').trim(), '|Citation|Edit|Title|title0|Alternate|Titles|alternateTitle0|alternateTitle1|Dates|October|13th|2016|(dateType)|October|22nd|2016|(dateType)|Identifier|identifier0|identifier-0|Responsible|Party|role|(|)|role|(|)|Edit|Citation|');
      await (0, _testHelpers.click)('.btn-success'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-citation/preview editCitation=editCitation}}
              template block text
            {{/object/md-citation/preview}}
          
      */
      {
        "id": "awiX/FJZ",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"editCitation\"],[[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"editCitation\",\"object/md-citation/preview\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-card').textContent.replace(/[ \n]+/g, '|').trim(), '|Citation|Edit|Title|Not|Defined|Alternate|Titles|No|alternate|titles|assigned.|Dates|No|dates|assigned.|Identifier|No|identifiers|assigned.|Responsible|Party|No|responsibility|assigned.|template|block|text|Edit|Citation|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-constraint/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md constraint', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {});
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-constraint profilePath="foobar" model=model}}
      */
      {
        "id": "yFxAaTz7",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-constraint\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Constraint|Type|The|type|of|constraint.|No|Use|Limitations|found.|Add|Use|Limitation|Legal|Access|Constraints|Use|Constraints|No|Other|Constraint|found.|Add|Other|Constraint|Security|Classification|Name|of|the|handling|restrictions|on|the|resource|or|metadata.|Classification|System|Name|Note|Handling|Description|No|Responsible|Party|found.|Add|Responsible|Party|No|Graphic|or|Logo|found.|Add|Graphic|or|Logo|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-constraint profilePath="foobar" model=model}}
              template block text
            {{/object/md-constraint}}
          
      */
      {
        "id": "xZDNNVUF",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-constraint\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Constraint|Type|The|type|of|constraint.|No|Use|Limitations|found.|Add|Use|Limitation|Legal|Access|Constraints|Use|Constraints|No|Other|Constraint|found.|Add|Other|Constraint|Security|Classification|Name|of|the|handling|restrictions|on|the|resource|or|metadata.|Classification|System|Name|Note|Handling|Description|No|Responsible|Party|found.|Add|Responsible|Party|No|Graphic|or|Logo|found.|Add|Graphic|or|Logo|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-date-array/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md date array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-date-array value=model profilePath="foobar"}}
      */
      {
        "id": "BFGuGO1f",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"value\",\"profilePath\"],[[35,0],\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-date-array\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|No|Date|found.|Add|Date|');
      this.set('model', [{
        "date": "2016-10-12",
        "dateType": "dateType",
        description: 'description'
      }]);
      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[ \n]+/g, '|').trim(), '|Dates|1|Add|#|Date|Date|Type|Description|0|dateType|×|Delete|', 'item'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-date-array value=model profilePath="foobar"}}
              template block text
            {{/object/md-date-array}}
          
      */
      {
        "id": "Tc7P0rrK",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"value\",\"profilePath\"],[[35,0],\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-date-array\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[ \n]+/g, '|').trim(), '|Dates|1|Add|#|Date|Date|Type|Description|0|dateType|×|template|block|text|Delete|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-date/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md date', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <table><tr>{{object/md-date model=model profilePath="foobar"}}</tr></table>
      */
      {
        "id": "NP0Uy4eC",
        "block": "{\"symbols\":[],\"statements\":[[10,\"table\"],[12],[10,\"tr\"],[12],[1,[30,[36,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]]]],[13],[13]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-date\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('table').textContent.replace(/[ \n]+/g, '|').trim(), "|Choose|date|type|");
      this.set('model', {
        "date": "2016-10-12",
        "dateType": "dateType",
        description: 'description'
      });
      assert.equal((0, _testHelpers.find)('table').textContent.replace(/[ \n]+/g, '|').trim(), "|dateType|×|"); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <table><tr>
            {{#object/md-date profilePath="foobar"}}
              template block text
            {{/object/md-date}}
          </tr></table>
      */
      {
        "id": "OaHUDko9",
        "block": "{\"symbols\":[],\"statements\":[[10,\"table\"],[12],[10,\"tr\"],[12],[2,\"\\n\"],[6,[37,0],null,[[\"profilePath\"],[\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"],[13],[13]],\"hasEval\":false,\"upvars\":[\"object/md-date\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('table').textContent.replace(/[ \n]+/g, '|').trim(), "|Choose|date|type|template|block|text|");
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-distribution/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md distribution', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        "description": "description",
        "liabilityStatement": "liabilityStatement",
        "distributor": [{
          "contact": {
            "role": "role",
            "roleExtent": [{
              "temporalExtent": [{
                "timePeriod": {
                  "startDateTime": "2016-10-24T11:10:15.2-10:00"
                }
              }]
            }],
            "party": [{
              "contactId": "individualId0"
            }]
          }
        }, {
          "contact": {
            "role": "role",
            "party": [{
              "contactId": "individualId0"
            }]
          }
        }]
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-distribution model=model profilePath="foobar"}}
      */
      {
        "id": "Ng8Z84R8",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-distribution\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Distribution|#|Delete|Description|Liablity|Statement|Distributors|2|Add|OK|#|Contacts|0|role|(|)|More...|Delete|1|role|(|)|More...|Delete|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-distribution model=model profilePath="foobar"}}
              template block text
            {{/object/md-distribution}}
          
      */
      {
        "id": "u37ISDfu",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-distribution\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Distribution|#|Delete|Description|Liablity|Statement|Distributors|2|Add|OK|#|Contacts|0|role|(|)|More...|Delete|1|role|(|)|More...|Delete|', 'block and list');
    });
    (0, _qunit.skip)('call actions', async function (assert) {
      assert.expect(1);
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-distributor/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md distributor', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('distributor', {
        "contact": {
          "role": "role",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": "individualId0"
          }]
        },
        "orderProcess": [{
          "fees": "1.00USD"
        }, {
          "fees": "2.00USD"
        }],
        "transferOption": [{
          "transferSize": 9.9
        }, {
          "transferSize": 10.9
        }]
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-distributor model=distributor profilePath="foobar"}}
      */
      {
        "id": "uBoM5LdZ",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"distributor\",\"object/md-distributor\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Contacts|Role|role|×|Transfer|Options|2|Add|OK|#|Size(mb)|Online?|Offline?|Format?|0|9.9|no|no|no|More...|Delete|1|10.9|no|no|no|More...|Delete|Order|Process|Fees|Planned|Availability|Ordering|Instructions|Turnaround|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-distributor model=distributor profilePath="foobar"}}
              template block text
            {{/object/md-distributor}}
          
      */
      {
        "id": "ZiygAYPx",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"distributor\",\"object/md-distributor\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Contacts|Role|role|×|Transfer|Options|2|Add|OK|#|Size(mb)|Online?|Offline?|Format?|0|9.9|no|no|no|More...|Delete|1|10.9|no|no|no|More...|Delete|Order|Process|Fees|Planned|Availability|Ordering|Instructions|Turnaround|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-distributor/preview/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_testHelpers, _qunit, _emberQunit, _createContact) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md distributor/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      var store = this.owner.lookup('service:store');
      this.set('contacts', this.owner.lookup('service:contacts'));
      store.createRecord('contact', (0, _createContact.default)(1)[0]); // Set any properties with this.set('myProperty', 'value');

      this.set('distributor', {
        "contact": {
          "role": "role",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": 0
          }]
        },
        "orderProcess": [{
          "fees": "1.00USD"
        }, {
          "fees": "2.00USD"
        }],
        "transferOption": [{
          "transferSize": 9.9
        }, {
          "transferSize": 10.9
        }]
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-distributor/preview item=distributor}}
      */
      {
        "id": "KYgZCtcs",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"item\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"distributor\",\"object/md-distributor/preview\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|role|(|Contact0|)|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-distributor/preview class="testme" item=distributor}}
              template block text
            {{/object/md-distributor/preview}}
          
      */
      {
        "id": "l3ppSKqK",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"class\",\"item\"],[\"testme\",[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"distributor\",\"object/md-distributor/preview\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[\s\n]+/g, '|').trim(), '|role|(|Contact0|)|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-documentation/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-citation"], function (_testHelpers, _qunit, _emberQunit, _createCitation) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md documentation', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('doc', {
        resourceType: [{
          "type": "foo",
          "name": "bar"
        }],
        citation: (0, _createCitation.default)(2)
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-documentation profilePath="foobar" model=doc}}
      */
      {
        "id": "a7j4+XFn",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"doc\",\"object/md-documentation\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Resource|Types|1|Add|#|Type|Name|0|foo|×|Delete|Basic|Information|Title|Alternate|Titles|2|Add|Alternate|Title|0|Delete|1|Delete|Dates|2|Add|Date|#|Date|Date|Type|Description|0|dateType|×|Delete|1|dateType|×|Delete|Edition|Presentation|Form|×|presentationForm0|×|presentationForm1|Responsible|Parties|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Online|Resource|2|Add|OK|#|Name|Uri|0|Not|Defined|http://adiwg.org|Edit|Delete|1|Not|Defined|http://mdeditor.org|Edit|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier0|Not|Defined|Not|Defined|More...|Delete|1|identifier-0|Not|Defined|Not|Defined|More...|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Edit|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Edit|Delete|Series|Name|Issue|Page|Other|Details|2|Add|0|Delete|1|Delete|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName:|Edit|Delete|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-documentation profilePath="foobar" model=doc}}
              template block text
            {{/object/md-documentation}}
          
      */
      {
        "id": "zzHGNytB",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"doc\",\"object/md-documentation\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Resource|Types|1|Add|#|Type|Name|0|foo|×|Delete|Basic|Information|Title|Alternate|Titles|2|Add|Alternate|Title|0|Delete|1|Delete|Dates|2|Add|Date|#|Date|Date|Type|Description|0|dateType|×|Delete|1|dateType|×|Delete|Edition|Presentation|Form|×|presentationForm0|×|presentationForm1|Responsible|Parties|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Online|Resource|2|Add|OK|#|Name|Uri|0|Not|Defined|http://adiwg.org|Edit|Delete|1|Not|Defined|http://mdeditor.org|Edit|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier0|Not|Defined|Not|Defined|More...|Delete|1|identifier-0|Not|Defined|Not|Defined|More...|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Edit|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Edit|Delete|Series|Name|Issue|Page|Other|Details|2|Add|0|Delete|1|Delete|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName:|Edit|Delete|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-documentation/preview/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-citation"], function (_testHelpers, _qunit, _emberQunit, _createCitation) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md documentation/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('doc', {
        resourceType: [{
          "type": "foo",
          "name": "bar"
        }],
        citation: (0, _createCitation.default)(2)
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-documentation/preview item=doc}}
      */
      {
        "id": "waRXwSEx",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"item\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"doc\",\"object/md-documentation/preview\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.text-muted').textContent.replace(/[\s\n]+/g, '|').trim(), '|Document|#|Resource|Type(s)|foo:|bar|Title|title0|Alternate|Titles|alternateTitle0|alternateTitle1|Dates|October|13th|2016|(dateType)|October|22nd|2016|(dateType)|Identifier|identifier0|identifier-0|Responsible|Party|role|(|)|role|(|)|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-documentation/preview class="testme" item=doc}}
              template block text
            {{/object/md-documentation/preview}}
          
      */
      {
        "id": "xyYQaqiC",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"class\",\"item\"],[\"testme\",[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"doc\",\"object/md-documentation/preview\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[\s\n]+/g, '|').trim(), '|Document|#|Resource|Type(s)|foo:|bar|Title|title0|Alternate|Titles|alternateTitle0|alternateTitle1|Dates|October|13th|2016|(dateType)|October|22nd|2016|(dateType)|Identifier|identifier0|identifier-0|Responsible|Party|role|(|)|role|(|)|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-domain/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-dictionary"], function (_testHelpers, _qunit, _emberQunit, _createDictionary) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md domain', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('domain', (0, _createDictionary.createDomain)(1)[0]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-domain profilePath="foobar" model=domain}}
      */
      {
        "id": "Qixb3pZb",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"domain\",\"object/md-domain\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Domain|Information|Domain|Identifier|Code|Name|Common|Name|Description|Domain|Items|1|Add|OK|#|Domain|Item|Name|Value|Definition|0|More...|Delete|Domain|Reference|Edit|Title|Not|Defined|Alternate|Titles|No|alternate|titles|assigned.|Dates|No|dates|assigned.|Identifier|No|identifiers|assigned.|Responsible|Party|No|responsibility|assigned.|Edit|Citation|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-domain profilePath="foobar" model=domain}}
              template block text
            {{/object/md-domain}}
          
      */
      {
        "id": "0+9HoZys",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"domain\",\"object/md-domain\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Domain|Information|Domain|Identifier|Code|Name|Common|Name|Description|Domain|Items|1|Add|OK|#|Domain|Item|Name|Value|Definition|0|More...|Delete|Domain|Reference|Edit|Title|Not|Defined|Alternate|Titles|No|alternate|titles|assigned.|Dates|No|dates|assigned.|Identifier|No|identifiers|assigned.|Responsible|Party|No|responsibility|assigned.|Edit|Citation|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-domainitem/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md domainitem', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('item', {
        "name": "name0",
        "value": "value0",
        "definition": "definition0",
        "reference": {
          "title": "domainReference"
        }
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-domainitem profilePath="foobar" model=item}}
      */
      {
        "id": "mzgmPIiN",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"item\",\"object/md-domainitem\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), 'Name|Value|Definition|Item|Reference|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-domainitem profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-domainitem}}
          
      */
      {
        "id": "QFdCM861",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[30,[36,0],null,null]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"hash\",\"object/md-domainitem\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), 'Name|Value|Definition|Item|Reference|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-domainitem/preview/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md domainitem/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('item', {
        "name": "name0",
        "value": "value0",
        "definition": "definition0",
        "reference": {
          "title": "domainReference"
        }
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-domainitem/preview profilePath="foobar" model=item tagName="table"}}
      */
      {
        "id": "akAZYwJ3",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\",\"tagName\"],[\"foobar\",[35,0],\"table\"]]]]],\"hasEval\":false,\"upvars\":[\"item\",\"object/md-domainitem/preview\"]}",
        "meta": {}
      }));
      assert.dom('input').exists({
        count: 3
      });
      assert.equal((0, _testHelpers.findAll)('input')[0].value, 'name0', 'name');
      assert.equal((0, _testHelpers.findAll)('input')[1].value, 'value0', 'value');
      assert.equal((0, _testHelpers.findAll)('input')[2].value, 'definition0', 'definition'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-domainitem/preview profilePath="foobar" model=item tagName="table"}}
              template block text
            {{/object/md-domainitem/preview}}
          
      */
      {
        "id": "opRhn+HS",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"profilePath\",\"model\",\"tagName\"],[\"foobar\",[35,0],\"table\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"item\",\"object/md-domainitem/preview\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('table').textContent.replace(/[\s\n]+/g, '|').trim(), '|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-entity/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-dictionary"], function (_testHelpers, _qunit, _emberQunit, _createDictionary) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md entity', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('dictionary', (0, _createDictionary.createDictionary)(1)[0].json.dataDictionary);
      this.set('entity', this.dictionary.entity[0]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-entity dictionary=dictionary profilePath="foobar" model=entity}}
      */
      {
        "id": "vr9l4Blt",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"dictionary\",\"profilePath\",\"model\"],[[35,1],\"foobar\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"entity\",\"dictionary\",\"object/md-entity\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Entity|Information|Entity|Identifier|Code|Name|Definition|Common|Name|Aliases|2|Add|Alias|0|Delete|1|Delete|Attributes|3|Add|OK|#|Attribute|Name|Data|Type|Definition|Allow|Null?|0|dataType0|×|More...|Delete|1|dataType1|×|More...|Delete|2|dataType2|×|More...|Delete|Entity|Structure|Field|Separator|Character|#|Header|Lines|Quote|Character|Entity|Keys|Primary|Key|Attributes|×|primaryKeyAttributeCodeName0-0|×|primaryKeyAttributeCodeName1-0|Foreign|Keys|1|Add|Foreign|Key|#|Local|Attributes|Referenced|Entity|Referenced|Attributes|0|×|attributeCommonName0-0|referencedEntityCodeName00|×|×|referencedAttributeCodeName0-0|Delete|Entity|Indices|1|Add|#|Name|Attributes|Duplicates?|0|×|attributeCodeName0-0|?|Delete|No|Entity|Reference|found.|Add|Entity|Reference|');
      assert.dom('.md-indicator-related').isVisible({
        count: 2
      }); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-entity dictionary=(hash) profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-entity}}
          
      */
      {
        "id": "WIJa1bHJ",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"dictionary\",\"profilePath\",\"model\"],[[30,[36,0],null,null],\"foobar\",[30,[36,0],null,null]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"hash\",\"object/md-entity\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Entity|Information|Entity|Identifier|Code|Name|Definition|Common|Name|No|Alias|found.|Add|Alias|No|Attributes|found.|Add|Attribute|Entity|Structure|Field|Separator|Character|#|Header|Lines|Quote|Character|Entity|Keys|Primary|Key|Attributes|No|Foreign|Key|found.|Add|Foreign|Key|No|Entity|Index|found.|Add|Entity|Index|No|Entity|Reference|found.|Add|Entity|Reference|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-extent/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/create-extent"], function (_qunit, _emberQunit, _testHelpers, _createExtent) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-extent', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(9); // Set any properties with this.set('myProperty', 'value');

      this.set('model', (0, _createExtent.default)(1)[0]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-extent profilePath="foobar" extent=model}}
      */
      {
        "id": "GZzHskFS",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"extent\"],[\"foobar\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-extent\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Extent|Description|Geographic|Extent|Bounding|Box|North|East|South|West|Calculate|Clear|Description|Contains|Data|The|geographic|extent|contains|some|or|all|of|the|data|Edit|Features|Clear|Features|+−|Terrain|Features|Bounding|BoxLeaflet|');
      const inputs = (0, _testHelpers.findAll)('.form-group input, .form-group textarea');
      inputs.forEach(i => assert.dom(i).hasValue());
      this.set('model.geographicExtent.firstObject.geographicElement', []);
      this.set('model.geographicExtent.firstObject.boundingBox', {}); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-extent profilePath="foobar" extent=model}}
              template block text
            {{/object/md-extent}}
          
      */
      {
        "id": "cwcmjBEh",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"profilePath\",\"extent\"],[\"foobar\",[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-extent\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Extent|Description|Geographic|Extent|Bounding|Box|North|East|South|West|Calculate|Clear|Description|Contains|Data|The|geographic|extent|contains|some|or|all|of|the|data|No|Features|to|display.|Add|Features|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-extent/spatial/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md extent/spatial', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(6); // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.deleteFeatures = function () {
        assert.ok(true, 'call delete');
      };

      this.editFeatures = function (val) {
        assert.equal(val, 9, 'call edit');
      };

      this.extent = {
        "geographicExtent": [{
          // "boundingBox": {
          //   "northLatitude": 34.741612,
          //   "southLatitude": 32.472695,
          //   "eastLongitude": -116.542054,
          //   "westLongitude": -117.729264
          // },
          "geographicElement": [{
            "type": "Feature",
            "id": "3843b29f-bec7-418d-919a-4f794ce749cf",
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[-116.542054, 32.472695], [-117.596742, 34.741612], [-117.596742, 34.741612], [-117.729264, 32.805745], [-117.729264, 32.805745], [-116.542054, 32.472695]]]
            },
            "properties": {
              "name": "New Feature"
            }
          }]
        }]
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-extent/spatial
            extent=extent
            index=9
            deleteFeatures=deleteFeatures
            editFeatures=editFeatures
            profilePath="foobar"
          }}
      */
      {
        "id": "CROtDKo8",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,3],null,[[\"extent\",\"index\",\"deleteFeatures\",\"editFeatures\",\"profilePath\"],[[35,2],9,[35,1],[35,0],\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"editFeatures\",\"deleteFeatures\",\"extent\",\"object/md-extent/spatial\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Geographic|Extent|Bounding|Box|North|East|South|West|Calculate|Clear|Description|Contains|Data|The|geographic|extent|contains|some|or|all|of|the|data|Edit|Features|Clear|Features|+−|Terrain|FeaturesLeaflet|');
      await (0, _testHelpers.click)('.btn-primary');
      assert.equal(JSON.stringify(this.extent.geographicExtent[0].boundingBox), JSON.stringify({
        "northLatitude": 34.741612,
        "southLatitude": 32.472695,
        "eastLongitude": -116.542054,
        "westLongitude": -117.729264
      }), 'calculateBox');
      await (0, _testHelpers.doubleClick)('.btn-danger');
      assert.equal(JSON.stringify(this.extent.geographicExtent[0].boundingBox), JSON.stringify({
        "northLatitude": null,
        "southLatitude": null,
        "eastLongitude": null,
        "westLongitude": null
      }), 'clearBox');
      await (0, _testHelpers.click)('.btn-toolbar .btn-success');
      await (0, _testHelpers.doubleClick)('.btn-toolbar .btn-danger');
      this.empty = {
        geographicExtent: [{}]
      }; // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-extent/spatial extent=empty profilePath="foobar"
      }}
              template block text
            {{/object/md-extent/spatial}}
          
      */
      {
        "id": "BqvMvCHw",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"extent\",\"profilePath\"],[[35,0],\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"empty\",\"object/md-extent/spatial\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Geographic|Extent|Bounding|Box|North|East|South|West|Calculate|Clear|Description|Contains|Data|The|geographic|extent|contains|some|or|all|of|the|data|No|Features|to|display.|Add|Features|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-funding/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md funding', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('funding', {
        "allocation": [{
          "amount": 9.9,
          "currency": "currency",
          "onlineResource": [],
          "responsibleParty": []
        }],
        "timePeriod": {
          "id": "id",
          "description": "description",
          "identifier": {
            "identifier": "identifier",
            "namespace": "namespace"
          },
          "periodName": ["periodName0", "periodName1"],
          // "startDateTime": date,
          "endDateTime": "2016-12-31",
          "timeInterval": {
            "interval": 9,
            "units": "year"
          },
          "duration": {
            "years": 1,
            "months": 1,
            "days": 1,
            "hours": 1,
            "minutes": 1,
            "seconds": 1
          }
        },
        description: 'foo is bar.'
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-funding model=funding profilePath="foobar"}}
      */
      {
        "id": "GHf0uQ/9",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"funding\",\"object/md-funding\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Allocation|1|Add|OK|#|Amount|Currency|Matching|0|9.9|currency|Not|Defined|Edit|Delete|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Time|Period|Names|2|Add|Time|Period|Name|0|Delete|1|Delete|Interval|Interval|Amount|Time|Unit|year|×|Duration|Years|Months|Days|Hours|Minutes|Seconds|Description|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-funding model=(hash) profilePath="foobar"}}
              template block text
            {{/object/md-funding}}
          
      */
      {
        "id": "ldA4kpK2",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"model\",\"profilePath\"],[[30,[36,0],null,null],\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"hash\",\"object/md-funding\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Allocation|found.|Add|Allocation|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|No|Time|Period|Name|found.|Add|Time|Period|Name|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|Description|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-funding/preview/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md funding/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('funding', {
        "allocation": [{
          "amount": 9.9,
          "currency": "currency"
        }],
        "timePeriod": {
          "endDateTime": "2016-12-31"
        }
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>{{object/md-funding/preview item=funding}}</section>
      */
      {
        "id": "P9acy/mZ",
        "block": "{\"symbols\":[],\"statements\":[[10,\"section\"],[12],[1,[30,[36,1],null,[[\"item\"],[[35,0]]]]],[13]],\"hasEval\":false,\"upvars\":[\"funding\",\"object/md-funding/preview\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Start|Date:|Not|defined|End|Date:|12-31-2016|Allocations|Amount|Currency|Source|Recipient|Match?|9.9|currency|--|--|--|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>
            {{#object/md-funding/preview item=(hash)}}
              template block text
            {{/object/md-funding/preview}}</section>
          
      */
      {
        "id": "u5YnIJjM",
        "block": "{\"symbols\":[],\"statements\":[[10,\"section\"],[12],[2,\"\\n\"],[6,[37,1],null,[[\"item\"],[[30,[36,0],null,null]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n      \"]],\"parameters\":[]}]]],[13],[2,\"\\n    \"]],\"hasEval\":false,\"upvars\":[\"hash\",\"object/md-funding/preview\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Start|Date:|Not|defined|End|Date:|Not|defined|Allocations|Amount|Currency|Source|Recipient|Match?|No|allocations|found.|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-graphic-array/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md graphic array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('graphic', [{
        "fileName": "fileName",
        "fileDescription": "fileDescription",
        "fileType": "fileType",
        "fileUri": [{
          "uri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
        }]
      }, {
        "fileName": "fileName1",
        "fileDescription": "fileDescription1",
        "fileType": "fileType1",
        "fileUri": [{
          "uri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
        }]
      }]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-graphic-array model=graphic}}
      */
      {
        "id": "awMJ9MGZ",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"graphic\",\"object/md-graphic-array\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName1:|Edit|Delete|');
      assert.ok((0, _testHelpers.find)('.md-logo-preview').complete, 'loaded image'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-graphic-array model=graphic}}
              template block text
            {{/object/md-graphic-array}}
          
      */
      {
        "id": "tJeTnJ9/",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"model\"],[[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"graphic\",\"object/md-graphic-array\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName1:|Edit|Delete|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-identifier-array/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md identifier array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(5); // Set any properties with this.set('myProperty', 'value');

      this.set('id', [{
        "identifier": "identifier",
        "authority": {
          "title": "title"
        }
      }, {
        "identifier": "identifier1",
        "authority": {
          "title": "title1"
        }
      }]);
      this.set('edit', function (id) {
        assert.ok(id, 'called edit');
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-identifier-array model=id editItem=edit}}
      */
      {
        "id": "jbJNiPPM",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,2],null,[[\"model\",\"editItem\"],[[35,1],[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"edit\",\"id\",\"object/md-identifier-array\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier|Not|Defined|Not|Defined|More...|Delete|1|identifier1|Not|Defined|Not|Defined|More...|Delete|');
      await (0, _testHelpers.click)('.btn-info');
      assert.equal(this.id.length, 3, 'add item');
      await (0, _testHelpers.doubleClick)('.btn-danger');
      assert.equal(this.id.length, 2), 'delete item'; // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>
            {{#object/md-identifier-array}}
              template block text
            {{/object/md-identifier-array}}
            </section>
          
      */
      {
        "id": "fqjiwIDs",
        "block": "{\"symbols\":[],\"statements\":[[10,\"section\"],[12],[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"      \"],[13],[2,\"\\n    \"]],\"hasEval\":false,\"upvars\":[\"object/md-identifier-array\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Identifier|found.|Add|Identifier|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-identifier-object-table/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-identifier"], function (_testHelpers, _qunit, _emberQunit, _createIdentifier) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md identifier object table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('id', (0, _createIdentifier.default)(2));
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-identifier-object-table model=id}}
      */
      {
        "id": "RX3+0rHF",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"id\",\"object/md-identifier-object-table\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|namespace0|Edit|Delete|1|identifier1|namespace1|Edit|Delete|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-identifier-object-table}}
              template block text
            {{/object/md-identifier-object-table}}
          
      */
      {
        "id": "RWjlmQEi",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"object/md-identifier-object-table\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Identifier|found.|Add|Identifier|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-identifier/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-identifier"], function (_testHelpers, _qunit, _emberQunit, _createIdentifier) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md identifier', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('id', (0, _createIdentifier.default)(1)[0]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-identifier model=id profilePath="foobar"}}
      */
      {
        "id": "36roWv/X",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"id\",\"object/md-identifier\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-identifier').textContent.replace(/[\s\n]+/g, '|').trim(), 'Identifier|Namespace|namespace0|×|Version|Description|Authority|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|');
      assert.dom('input').hasValue('identifier0', 'assign value'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-identifier profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-identifier}}
          
      */
      {
        "id": "p5Mynaui",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[30,[36,0],null,null]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"hash\",\"object/md-identifier\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.md-identifier').textContent.replace(/[\s\n]+/g, '|').trim(), "Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Authority|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|template|block|text|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-keyword-citation/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-citation"], function (_testHelpers, _qunit, _emberQunit, _createCitation) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md keyword citation', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('keyword', {
        keywordType: 'theme',
        thesaurus: (0, _createCitation.default)(1)[0]
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-keyword-citation model=keyword profilePath="foobar"}}
      */
      {
        "id": "sjth2048",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"keyword\",\"object/md-keyword-citation\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Title|Date|Date|Type|Choose|date|type|Type|theme|?|Edition|URL|');
      var input = (0, _testHelpers.findAll)('form input').mapBy('value').join('|');
      assert.equal(input, "title0|2016-10-13|edition|http://adiwg.org", 'input values'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-keyword-citation model=(hash thesaurus=(hash)) profilePath="foobar"}}
              template block text
            {{/object/md-keyword-citation}}
          
      */
      {
        "id": "AKc/2GEO",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"model\",\"profilePath\"],[[30,[36,0],null,[[\"thesaurus\"],[[30,[36,0],null,null]]]],\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"hash\",\"object/md-keyword-citation\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), "|Title|Date|Date|Type|Choose|date|type|Type|Choose|keyword|type|Edition|URL|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-keyword-list/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md keyword list', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        'keyword': [{
          'identifier': 'id1',
          'keyword': 'foo1',
          'path': ['foo1']
        }, {
          'identifier': 'id2',
          'keyword': 'bar1',
          'path': ['foo1', 'bar1']
        }]
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-keyword-list model=model profilePath="foobar"}}
      */
      {
        "id": "MWF+OsCP",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-keyword-list\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('ul').textContent.replace(/[ \n]+/g, '|').trim(), '|Delete|foo1|Delete|bar1|');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-keyword-list model=model readOnly=false profilePath="foobar"}}
      */
      {
        "id": "scT4U9f+",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\",\"readOnly\",\"profilePath\"],[[35,0],false,\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-keyword-list\"]}",
        "meta": {}
      }));
      assert.dom('tr').exists({
        count: 4
      }, 'Check number of rows.');
      assert.dom('input').exists({
        count: 4
      }, 'Check number of input el.');
      assert.equal(this.$('input')[2].value, 'bar1', 'Correct value for keyword input.');
      assert.equal(this.$('input')[3].value, 'id2', 'Correct value for id input.');
      assert.equal((0, _testHelpers.find)('table').textContent.replace(/[ \n]+/g, '|').trim(), '|Keyword|Id|(Optional)|Delete|Delete|Add|Keyword|Toggle|Thesaurus|', 'readOnly = false.'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>
            {{#object/md-keyword-list profilePath="foobar"}}
              template block text
            {{/object/md-keyword-list}}</section>
          
      */
      {
        "id": "l+RvqXwY",
        "block": "{\"symbols\":[],\"statements\":[[10,\"section\"],[12],[2,\"\\n\"],[6,[37,0],null,[[\"profilePath\"],[\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n      \"]],\"parameters\":[]}]]],[13],[2,\"\\n    \"]],\"hasEval\":false,\"upvars\":[\"object/md-keyword-list\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[ \n]+/g, '|').trim(), '|Add|some|keywords.|template|block|text|', 'Block form renders.');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-lineage/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md lineage', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('lineage', {
        "statement": "statement",
        "scope": {
          "scopeCode": "scopeCode"
        },
        "citation": [{
          "title": "title"
        }, {
          "title": "title"
        }],
        "source": [{
          "description": "description"
        }, {
          "description": "description"
        }],
        "sourceProcessStep": [{
          "description": "description"
        }, {
          "description": "description"
        }]
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>{{object/md-lineage profilePath="foobar" model=lineage}}</section>
      */
      {
        "id": "WUVCTcic",
        "block": "{\"symbols\":[],\"statements\":[[10,\"section\"],[12],[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]]]],[13]],\"hasEval\":false,\"upvars\":[\"lineage\",\"object/md-lineage\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Statement|No|Process|Step|found.|Add|Process|Step|Source|2|Add|OK|#|Description|0|More...|Delete|1|More...|Delete|Citation|2|Add|OK|#|Title|0|title|More...|Delete|1|title|More...|Delete|Scope|scopeCode|×|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>
            {{#object/md-lineage profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-lineage}}</section>
          
      */
      {
        "id": "hJ5SGx5p",
        "block": "{\"symbols\":[],\"statements\":[[10,\"section\"],[12],[2,\"\\n\"],[6,[37,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[30,[36,0],null,null]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n      \"]],\"parameters\":[]}]]],[13],[2,\"\\n    \"]],\"hasEval\":false,\"upvars\":[\"hash\",\"object/md-lineage\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Statement|No|Process|Step|found.|Add|Process|Step|No|Source|found.|Add|Source|No|Citation|found.|Add|Citation|Scope|Select|type|of|resource.|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-lineage/preview/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md lineage/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('lineage', {
        "statement": "statement",
        "scope": {
          "scopeCode": "scopeCode"
        },
        "citation": [{
          "title": "title"
        }, {
          "title": "title"
        }],
        "source": [{
          "description": "description"
        }, {
          "description": "description"
        }],
        "sourceProcessStep": [{
          "description": "description"
        }, {
          "description": "description"
        }]
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>{{object/md-lineage/preview item=lineage}}</section>
      */
      {
        "id": "F2vVxa2y",
        "block": "{\"symbols\":[],\"statements\":[[10,\"section\"],[12],[1,[30,[36,1],null,[[\"item\"],[[35,0]]]]],[13]],\"hasEval\":false,\"upvars\":[\"lineage\",\"object/md-lineage/preview\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Lineage|#|Statement|statement|Process|Step|No|process|steps|assigned.|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>
            {{#object/md-lineage/preview}}
              template block text
            {{/object/md-lineage/preview}}</section>
          
      */
      {
        "id": "opDX7pN6",
        "block": "{\"symbols\":[],\"statements\":[[10,\"section\"],[12],[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n      \"]],\"parameters\":[]}]]],[13],[2,\"\\n    \"]],\"hasEval\":false,\"upvars\":[\"object/md-lineage/preview\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Lineage|#|Statement|Not|Defined|Process|Step|No|process|steps|assigned.|', 'template block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-locale-array/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md locale array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('locales', [{
        language: "eng",
        characterSet: "UTF-8",
        country: "USA"
      }, {
        language: "spa",
        characterSet: "UTF-32",
        country: "BDI"
      }]);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-locale-array value=locales}}
      */
      {
        "id": "lbgcQLTm",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"value\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"locales\",\"object/md-locale-array\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[\s\n]+/g, '|').trim(), '|2|Add|#|Language|Character|Set|Country|0|eng|?|×|UTF-8|?|×|USA|?|×|Delete|1|spa|?|×|UTF-32|?|×|BDI|?|×|Delete|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-locale-array}}
              template block text
            {{/object/md-locale-array}}
          
      */
      {
        "id": "E0I2vsc2",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"object/md-locale-array\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[\s\n]+/g, '|').trim(), '|Add|#|Language|Character|Set|Country|Add|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-locale/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md locale', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('settings', Ember.Object.create({
        data: Ember.Object.create({
          language: "eng",
          characterSet: "UTF-8",
          country: "USA"
        })
      }));
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>{{object/md-locale settings=settings model=(hash) profilePath="foobar"}}</section>
      */
      {
        "id": "akF4+Jw4",
        "block": "{\"symbols\":[],\"statements\":[[10,\"section\"],[12],[1,[30,[36,2],null,[[\"settings\",\"model\",\"profilePath\"],[[35,1],[30,[36,0],null,null],\"foobar\"]]]],[13]],\"hasEval\":false,\"upvars\":[\"hash\",\"settings\",\"object/md-locale\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Language|eng|?|×|Character|Set|UTF-8|?|×|Country|USA|?|×|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <section>
            {{#object/md-locale settings=settings model=(hash) profilePath="foobar"}}
              template block text
            {{/object/md-locale}}</section>
          
      */
      {
        "id": "R4cZd0Mm",
        "block": "{\"symbols\":[],\"statements\":[[10,\"section\"],[12],[2,\"\\n\"],[6,[37,2],null,[[\"settings\",\"model\",\"profilePath\"],[[35,1],[30,[36,0],null,null],\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n      \"]],\"parameters\":[]}]]],[13],[2,\"\\n    \"]],\"hasEval\":false,\"upvars\":[\"hash\",\"settings\",\"object/md-locale\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Language|eng|?|×|Character|Set|UTF-8|?|×|Country|USA|?|×|template|block|text|', 'template block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-maintenance/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md maintenance', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.model = {
        "frequency": "frequency",
        "date": [{
          "date": "2016-10-12",
          "dateType": "creation"
        }, {
          "date": "2016-10-12",
          "dateType": "publication"
        }],
        "scope": [{
          "scopeCode": "scopeCode0"
        }, {
          "scopeCode": "scopeCode1"
        }],
        "note": ["note0", "note1"],
        "contact": [{
          "role": "author",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": "individualId0"
          }]
        }, {
          "role": "publisher",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": "individualId1"
          }]
        }]
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-maintenance profilePath="foobar" model=model}}
      */
      {
        "id": "wqW4gVjy",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-maintenance\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Frequency|frequency|×|Dates|2|Add|Date|#|Date|Date|Type|Description|0|creation|?|×|Delete|1|publication|?|×|Delete|Contacts|2|Add|Contact|#|Role|Contacts|0|author|?|×|Delete|1|publisher|?|×|Delete|Notes|2|Add|Notes|0|Delete|1|Delete|Scope|×|scopeCode0|×|scopeCode1|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-maintenance profilePath="foobar"}}
              template block text
            {{/object/md-maintenance}}
          
      */
      {
        "id": "UpcZMzhm",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,[[\"profilePath\"],[\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"object/md-maintenance\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Frequency|Choose|a|value.|No|Date|found.|Add|Date|No|Contact|found.|Add|Contact|No|Notes|found.|Add|Note|Scope|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-medium/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md medium', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.model = {
        "mediumSpecification": {
          "title": "title"
        },
        "density": 9.9,
        "units": "units",
        "numberOfVolumes": 9,
        "mediumFormat": ["mediumFormat0", "mediumFormat1"],
        "note": "note",
        "identifier": {
          "identifier": "identifier"
        }
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-medium profilePath="foobar" model=model}}
      */
      {
        "id": "zadm3Hi6",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-medium\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), 'Medium|Title|Storage|Density|Density|Units|Number|Of|Volumes|Storage|Format|×|mediumFormat0|×|mediumFormat1|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Note|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-medium profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-medium}}
          
      */
      {
        "id": "fcXjux+b",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[30,[36,0],null,null]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"hash\",\"object/md-medium\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), "Medium|Title|Storage|Density|Density|Units|Number|Of|Volumes|Storage|Format|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Note|template|block|text|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-object-table/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-object-table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.model = [{
        biz: 'biz0',
        baz: 'baz0'
      }, {
        biz: 'biz1',
        baz: 'baz1'
      }];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-object-table header="Foo Bars" attributes="biz,baz"}}
      */
      {
        "id": "AwbScY+A",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,0],null,[[\"header\",\"attributes\"],[\"Foo Bars\",\"biz,baz\"]]]]],\"hasEval\":false,\"upvars\":[\"object/md-object-table\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Foo|Bars|found.|Add|Foo|Bar|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-object-table
             items=model
             header="FooBar"
             buttonText="Add FooBar"
             ellipsis=true
             profilePath="foobar"
             attributes="biz,baz" as |foo|
            }}
              <span>Biz:{{foo.biz}}</span>
              <span>Baz:{{foo.baz}}</span>
            {{/object/md-object-table}}
          
      */
      {
        "id": "quh/Pht5",
        "block": "{\"symbols\":[\"foo\"],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"items\",\"header\",\"buttonText\",\"ellipsis\",\"profilePath\",\"attributes\"],[[35,0],\"FooBar\",\"Add FooBar\",true,\"foobar\",\"biz,baz\"]],[[\"default\"],[{\"statements\":[[2,\"        \"],[10,\"span\"],[12],[2,\"Biz:\"],[1,[32,1,[\"biz\"]]],[13],[2,\"\\n        \"],[10,\"span\"],[12],[2,\"Baz:\"],[1,[32,1,[\"baz\"]]],[13],[2,\"\\n\"]],\"parameters\":[1]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-object-table\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|FooBar|2|Add|OK|#|Biz|Baz|0|biz0|baz0|Edit|Delete|1|biz1|baz1|Edit|Delete|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-objectroute-table/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md objectroute table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = [{
        biz: 'biz0',
        baz: 'baz0'
      }, {
        biz: 'biz1',
        baz: 'baz1'
      }];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-objectroute-table attributes="biz,baz" header="FooBar"}}
      */
      {
        "id": "A75WjSg7",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,0],null,[[\"attributes\",\"header\"],[\"biz,baz\",\"FooBar\"]]]]],\"hasEval\":false,\"upvars\":[\"object/md-objectroute-table\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|FooBar|found.|Add|FooBar|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-objectroute-table
             items=model
             header="FooBar"
             buttonText="Add FooBar"
             ellipsis=true
             profilePath="foobar"
             attributes="biz,baz" as |foo|
            }}
              <span>Biz:{{foo.biz}}</span>
              <span>Baz:{{foo.baz}}</span>
            {{/object/md-objectroute-table}}
          
      */
      {
        "id": "vh3Fq5h+",
        "block": "{\"symbols\":[\"foo\"],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"items\",\"header\",\"buttonText\",\"ellipsis\",\"profilePath\",\"attributes\"],[[35,0],\"FooBar\",\"Add FooBar\",true,\"foobar\",\"biz,baz\"]],[[\"default\"],[{\"statements\":[[2,\"        \"],[10,\"span\"],[12],[2,\"Biz:\"],[1,[32,1,[\"biz\"]]],[13],[2,\"\\n        \"],[10,\"span\"],[12],[2,\"Baz:\"],[1,[32,1,[\"baz\"]]],[13],[2,\"\\n\"]],\"parameters\":[1]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-objectroute-table\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|FooBar|2|Add|OK|#|Biz|Baz|0|biz0|baz0|More...|Delete|1|biz1|baz1|More...|Delete|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-online-resource/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md online resource', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = {
        "uri": "http://URI.example.com",
        "protocol": "protocol",
        "name": "name",
        "description": "description",
        "function": "download",
        "applicationProfile": "applicationProfile",
        "protocolRequest": "protocolRequest"
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-online-resource model=model profilePath="foobar"}}
      */
      {
        "id": "oSJqh5j/",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-online-resource\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), 'Name|URI|Protocol|Description|Function|download|?|×|Application|Profile|applicationProfile|×|Protocol|Request|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-online-resource profilePath="foobar" model=model}}
              template block text
            {{/object/md-online-resource}}
          
      */
      {
        "id": "PySVGstf",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-online-resource\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Name|URI|Protocol|Description|Function|download|?|×|Application|Profile|applicationProfile|×|Protocol|Request|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-party-array/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_testHelpers, _qunit, _emberQunit, _createContact) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md party array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.party = [{
        "role": "author",
        "roleExtent": [{
          "temporalExtent": [{
            "timePeriod": {
              "startDateTime": "2016-10-24T11:10:15.2-10:00"
            }
          }]
        }],
        "party": [{
          "contactId": 0
        }]
      }, {
        "role": "publisher",
        "party": [{
          "contactId": 1
        }]
      }];
      var contacts = (0, _createContact.default)(2);
      var cs = this.owner.lookup('service:contacts');
      cs.set('contacts', contacts);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-party-array value=party profilePath="foobar"}}
      */
      {
        "id": "2YK7jbov",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"value\",\"profilePath\"],[[35,0],\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"party\",\"object/md-party-array\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|2|Add|#|Role|Contacts|0|author|?|×|×|Contact0|Delete|1|publisher|?|×|×|Contact1|Delete|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-party-array model=(hash) profilePath="foobar"}}
              template block text
            {{/object/md-party-array}}
          
      */
      {
        "id": "672TylOc",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"model\",\"profilePath\"],[[30,[36,0],null,null],\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"hash\",\"object/md-party-array\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Add|#|Role|Contacts|Add|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-party/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_testHelpers, _qunit, _emberQunit, _createContact) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md party', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.party = {
        "role": "author",
        "roleExtent": [{
          "temporalExtent": [{
            "timePeriod": {
              "startDateTime": "2016-10-24T11:10:15.2-10:00"
            }
          }]
        }],
        "party": [{
          "contactId": 0
        }]
      };
      var contacts = (0, _createContact.default)(2);
      var cs = this.owner.lookup('service:contacts');
      cs.set('contacts', contacts);
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-party model=party}}
      */
      {
        "id": "8b3chPDH",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"party\",\"object/md-party\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Role|author|?|×|Contacts|×|Contact0|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-party model=(hash)}}
              template block text
            {{/object/md-party}}
          
      */
      {
        "id": "tQRKZFQv",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"model\"],[[30,[36,0],null,null]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"hash\",\"object/md-party\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Role|Select|or|enter|a|role|Contacts|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-process-step/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_testHelpers, _qunit, _emberQunit, _createContact) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md process step', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      var contacts = (0, _createContact.default)(2);
      var cs = this.owner.lookup('service:contacts');
      cs.set('contacts', contacts); //

      this.step = {
        "stepId": "stepId",
        "description": "description",
        "rationale": "rationale",
        "timePeriod": {
          "startDateTime": "2016-10-15"
        },
        "processor": [{
          "role": "role",
          "party": [{
            "contactId": "0"
          }]
        }, {
          "role": "role",
          "party": [{
            "contactId": "1"
          }]
        }],
        "stepSource": [{
          "description": "description",
          "sourceCitation": {
            "title": "title"
          },
          "metadataCitation": [{
            "title": "title0"
          }, {
            "title": "title1"
          }],
          "spatialResolution": {
            "measure": {
              "type": "distance",
              "value": 99.9,
              "unitOfMeasure": "unitOfMeasure"
            }
          },
          "referenceSystem": {
            "referenceSystemType": "referenceSystemType",
            "referenceSystemIdentifier": {
              "identifier": "identifier"
            }
          },
          "sourceProcessStep": [{
            "description": "description0"
          }, {
            "description": "description1"
          }]
        }],
        "stepProduct": [{
          "description": "description",
          "sourceCitation": {
            "title": "title"
          },
          "metadataCitation": [{
            "title": "title0"
          }, {
            "title": "title1"
          }],
          "spatialResolution": {
            "measure": {
              "type": "distance",
              "value": 99.9,
              "unitOfMeasure": "unitOfMeasure"
            }
          },
          "referenceSystem": {
            "referenceSystemType": "referenceSystemType",
            "referenceSystemIdentifier": {
              "identifier": "identifier"
            }
          },
          "sourceProcessStep": [{
            "description": "description0"
          }, {
            "description": "description1"
          }]
        }],
        "reference": [{
          "title": "title0"
        }, {
          "title": "title1"
        }]
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-process-step profilePath="foobar" model=step}}
      */
      {
        "id": "wp1epR63",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"step\",\"object/md-process-step\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "Step|ID|Description|Step|Sources|1|Add|#|Description|0|Delete|Step|Products|1|Add|#|Description|0|Delete|Processors|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Step|Reference|2|Add|OK|#|Title|0|title0|More...|Delete|1|title1|More...|Delete|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|No|Time|Period|Name|found.|Add|Time|Period|Name|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|Scope|Select|type|of|resource.|"); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-process-step profilePath="foobar" model=step}}
              template block text
            {{/object/md-process-step}}
          
      */
      {
        "id": "0FJyA4Xx",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"step\",\"object/md-process-step\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Step|ID|Description|Step|Sources|1|Add|#|Description|0|Delete|Step|Products|1|Add|#|Description|0|Delete|Processors|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Step|Reference|2|Add|OK|#|Title|0|title0|More...|Delete|1|title1|More...|Delete|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|No|Time|Period|Name|found.|Add|Time|Period|Name|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|Scope|Select|type|of|resource.|template|block|text|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-process-step/preview/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-process-step/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.source = {
        "description": "description",
        "sourceCitation": {
          "title": "title"
        },
        "metadataCitation": [{
          "title": "title0"
        }, {
          "title": "title1"
        }],
        "spatialResolution": {
          "measure": {
            "type": "distance",
            "value": 99.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        },
        "referenceSystem": {
          "referenceSystemType": "referenceSystemType",
          "referenceSystemIdentifier": {
            "identifier": "identifier"
          }
        },
        "sourceProcessStep": [{
          "description": "description0"
        }, {
          "description": "description1"
        }]
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-process-step/preview model=source profilePath="foobar"}}
      */
      {
        "id": "t+ezhZci",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"source\",\"object/md-process-step/preview\"]}",
        "meta": {}
      }));
      assert.dom('textarea').hasValue('description'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-process-step/preview model=source profilePath="foobar"}}
              template block text
            {{/object/md-process-step/preview}}
          
      */
      {
        "id": "gxSiRSSq",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"source\",\"object/md-process-step/preview\"]}",
        "meta": {}
      }));
      assert.dom('textarea').hasValue('description');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-profile/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/create-profile"], function (_qunit, _emberQunit, _testHelpers, _createProfile) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-profile', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.model = (0, _createProfile.default)(1)[0];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-profile record=model}}
      */
      {
        "id": "qyHgvxy5",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"record\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-profile\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|URL|Alias|Version|0.0.0|Update|Available|(0.0.1)|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-profile record=model}}
              template block text
            {{/object/md-profile}}
          
      */
      {
        "id": "H67THDTC",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"record\"],[[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-profile\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|URL|Alias|Version|0.0.0|Update|Available|(0.0.1)|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-profile/custom/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-profile/custom', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.model = {
        title: 'testme',
        description: 'testing description'
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-profile/custom record=model}}
      */
      {
        "id": "eP6ZzTzU",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"record\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-profile/custom\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), 'Title|Description|Profile|Definition|Select|the|profile|definition.|Select|Schemas|No|schemas|avialable.|Schemas|Selected|Select|schemas|from|the|list.|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-profile/custom record=model}}
              template block text
            {{/object/md-profile/custom}}
          
      */
      {
        "id": "XXuXtyKq",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"record\"],[[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-profile/custom\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|Title|Description|Profile|Definition|Select|the|profile|definition.|Select|Schemas|No|schemas|avialable.|Schemas|Selected|Select|schemas|from|the|list.|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-profile/form/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/create-profile"], function (_qunit, _emberQunit, _testHelpers, _createProfile) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-profile/form', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.model = (0, _createProfile.default)(1)[0];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-profile/form record=model}}
      */
      {
        "id": "WvoO0JRc",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"record\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-profile/form\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), 'URL|Alias|Version|0.0.0|Update|Available|(0.0.1)|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-profile/form record=model}}
              template block text
            {{/object/md-profile/form}}
          
      */
      {
        "id": "WYJBhn+P",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"record\"],[[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-profile/form\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|URL|Alias|Version|0.0.0|Update|Available|(0.0.1)|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-profile/preview/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/create-profile"], function (_qunit, _emberQunit, _testHelpers, _createProfile) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-profile/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.model = (0, _createProfile.default)(1)[0];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-profile/preview  record=model}}
      */
      {
        "id": "FmnIK2vN",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"record\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-profile/preview\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-profile/preview record=model}}
              template block text
            {{/object/md-profile/preview}}
          
      */
      {
        "id": "lNE51O/H",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"record\"],[[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-profile/preview\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-raster/attrgroup/attribute/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/create-record", "mdeditor/tests/helpers/md-helpers"], function (_qunit, _emberQunit, _testHelpers, _createRecord, _mdHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-raster/attrgroup/attribute', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    /*
      The searchable element in the codelist is causing extra pipe characters in the test, we need to find a solution to fix.
    */

    (0, _qunit.todo)('it renders', async function (assert) {
      let attribute = (0, _createRecord.createAttribute)(1);
      this.set('model', attribute[0]);
      let input = (0, _mdHelpers.nestedValues)(attribute[0]).join('|');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-raster/attrgroup/attribute profilePath="foobar" model=model}}
      */
      {
        "id": "J8V4PDEH",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-raster/attrgroup/attribute\"]}",
        "meta": {}
      }));
      assert.equal((0, _mdHelpers.formatContent)(this.element).trim(), "|Attribute|Description|Attribute|Identifier|1|Add|OK|#|Identifier|Namespace|0|identifier0|namespace0|Edit|Delete|Band|Boundary|Definition|×|bandBoundaryDefinition0|Transfer|Function|Type|×|transferFunctionType0|Transmitted|Polarization|×|transmittedPolarization0|Detected|Polarization|×|detectedPolarization0|Sequence|Identifier|Sequence|Identifier|Type|Min|Value|Max|Value|Units|Scale|Factor|Offset|Mean|Value|Number|Of|Values|Standard|Deviation|Bits|Per|Value|Bound|Min|Bound|Max|Bound|Units|Peak|Response|Tone|Gradations|Nominal|Spatial|Resolution|");
      assert.equal((0, _mdHelpers.parseInput)(this.element), input);
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-raster/attrgroup/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-raster/attrgroup', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-raster/attrgroup }}
      */
      {
        "id": "dzhFU7SO",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"object/md-raster/attrgroup\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Item|found.|Add|Item|', 'attrgroup component renders');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-raster/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/md-helpers"], function (_qunit, _emberQunit, _testHelpers, _mdHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-raster', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    /*
      The searchable element in the codelist is causing extra pipe characters in the test, we need to find a solution to fix.
    */

    (0, _emberQunit.todo)('it renders', async function (assert) {
      this.model = {
        "coverageName": "coverageName",
        "coverageDescription": "coverageDescription",
        "attributeGroup": [{
          "attributeContentType": ["attributeContentType1", "attributeContentType2"],
          "attribute": [{
            "attributeDescription": "attributeDescription"
          }]
        }],
        "processingLevelCode": {
          "identifier": "identifier1",
          "namespace": "namespace1"
        },
        "imageDescription": {
          "imageQualityCode": {
            "identifier": "identifier2",
            "namespace": "namespace2"
          },
          "illuminationElevationAngle": 45,
          "illuminationAzimuthAngle": 90,
          "imagingCondition": "imageCondition",
          "cloudCoverPercent": 88,
          "compressionQuantity": 23,
          "triangulationIndicator": "true",
          "radiometricCalibrationAvailable": "true",
          "cameraCalibrationAvailable": "false",
          "filmDistortionAvailable": "false",
          "lensDistortionAvailable": "true"
        }
      };

      let nestedValues = obj => typeof obj === 'object' ? Object.values(obj).map(nestedValues).flat() : [obj];

      let input = nestedValues(this.model).join('|');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-raster profilePath="foobar" model=model}}
      */
      {
        "id": "hxB/l/bZ",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-raster\"]}",
        "meta": {}
      }));
      assert.equal((0, _mdHelpers.formatContent)(this.element).trim(), '|Name|Description|Attribute|Groups|1|Add|Attribute|Group|#0|Attribute|Content|Type|×|attributeContentType1|×|attributeContentType2|Attribute|1|Add|OK|#|Attribute|Description|0|More...|Delete|Processing|Level|Code|Identifier|Namespace|namespace1|×|More|Image|Description|Image|Quality|Code|Identifier|Namespace|namespace2|×|More|Illumination|Elevation|Angle|Illumination|Azimuth|Angle|Imaging|Condition|Cloud|Cover|Percent|Compression|Quantity|Triangulation|Indicator|Radiometric|Calibration|Available|Camera|Calibration|Available|Film|Distortion|Available|Lens|Distortion|Available|');
      assert.equal((0, _mdHelpers.parseInput)(this.element), input, 'input renders');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-raster/image-desc/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/md-helpers"], function (_qunit, _emberQunit, _testHelpers, _mdHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-raster/image-desc', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      this.model = {
        "imageQualityCode": {
          "identifier": "identifier",
          "namespace": "namespace"
        },
        "illuminationElevationAngle": 45,
        "illuminationAzimuthAngle": 90,
        "imagingCondition": "imageCondition",
        "cloudCoverPercent": 88,
        "compressionQuantity": 23,
        "triangulationIndicator": "true",
        "radiometricCalibrationAvailable": "true",
        "cameraCalibrationAvailable": "false",
        "filmDistortionAvailable": "false",
        "lensDistortionAvailable": "true"
      };
      let input = (0, _mdHelpers.nestedValues)(this.model).join('|');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-raster/image-desc profilePath="foobar" model=model}}
      */
      {
        "id": "qSywwJ3V",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-raster/image-desc\"]}",
        "meta": {}
      }));
      assert.equal((0, _mdHelpers.formatContent)(this.element).trim(), '|Image|Quality|Code|Identifier|Namespace|namespace|×|More|Illumination|Elevation|Angle|Illumination|Azimuth|Angle|Imaging|Condition|Cloud|Cover|Percent|Compression|Quantity|Triangulation|Indicator|Radiometric|Calibration|Available|Camera|Calibration|Available|Film|Distortion|Available|Lens|Distortion|Available|', 'md-raster/image-desc component renders');
      assert.equal((0, _mdHelpers.parseInput)(this.element), input, 'md-raster/image-desc inputs render');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-raster/preview/component-test", ["qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/md-helpers"], function (_qunit, _emberQunit, _testHelpers, _mdHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-raster/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      this.model = {
        "coverageName": "coverageName",
        "coverageDescription": "coverageDescription"
      };
      let input = Object.values(this.model).join('|');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-raster/preview profilePath="foobar" model=model}}
      */
      {
        "id": "/zmRoR3w",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-raster/preview\"]}",
        "meta": {}
      }));
      assert.equal((0, _mdHelpers.formatContent)(this.element).trim(), '|Raster|Name|Raster|Description|', 'md-raster-preview component renders');
      assert.equal((0, _mdHelpers.parseInput)(this.element), input, 'md-raster-preview inputs renders');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-repository-array/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md repository array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.repo = [{
        "citation": {
          "title": "Arctic LCC data.gov"
        },
        "repository": "data.gov"
      }, {
        "citation": {
          "title": "Something"
        },
        "repository": "data.gov"
      }];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-repository-array value=repo profilePath="foo"}}
      */
      {
        "id": "l/M+ZClh",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"value\",\"profilePath\"],[[35,0],\"foo\"]]]]],\"hasEval\":false,\"upvars\":[\"repo\",\"object/md-repository-array\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Metadata|Repositories|2|Add|#|Repository|Collection|Title|0|data.gov|?|×|Delete|1|data.gov|?|×|Delete|');
      assert.dom('.md-input input').hasValue('Arctic LCC data.gov');
      assert.dom('.select-value').hasText('data.gov'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-repository-array profilePath="foo"}}
              template block text
            {{/object/md-repository-array}}
          
      */
      {
        "id": "8PAp/eXu",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,[[\"profilePath\"],[\"foo\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"object/md-repository-array\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Metadata|Repositories|Add|#|Repository|Collection|Title|Add|Metadata|Repository|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-resource-type-array/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md resource type array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.rt = [{
        "type": "project",
        "name": "foobar"
      }, {
        "type": "map"
      }];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-resource-type-array value=rt profilePath="foobar"}}
      */
      {
        "id": "s61s8NLi",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"value\",\"profilePath\"],[[35,0],\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"rt\",\"object/md-resource-type-array\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Resource|Types|2|Add|#|Type|Name|0|project|?|×|Delete|1|map|?|×|Delete|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-resource-type-array profilePath="foobar"}}
              template block text
            {{/object/md-resource-type-array}}
          
      */
      {
        "id": "VyqusENP",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,[[\"profilePath\"],[\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"object/md-resource-type-array\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Resource|Types|Add|#|Type|Name|Add|Resource|Type|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-schema/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-schema', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('data', Ember.Object.create({
        title: 'foo',
        uri: 'bar',
        remoteVersion: '1.1',
        localVersion: '1.0',
        hasUpdate: true
      }));
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-schema record=data}}
      */
      {
        "id": "71xKqOml",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"record\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"data\",\"object/md-schema\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \s\n]+/g, '|').trim(), '|Info|Schemas|Title|URL|Version|1.0|Update|Available|(1.1)|Description|Type|Select|the|record|type|for|schema.|Apply|Globally?|No|Yes|');
      assert.dom('.md-schema input').hasValue('foo', 'render form'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-schema record=data}}
              template block text
            {{/object/md-schema}}
          
      */
      {
        "id": "t+eUPNHP",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"record\"],[[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"data\",\"object/md-schema\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \s\n]+/g, '|').trim(), '|Info|Schemas|Title|URL|Version|1.0|Update|Available|(1.1)|Description|Type|Select|the|record|type|for|schema.|Apply|Globally?|No|Yes|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-schema/form/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-schema/form', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('data', Ember.Object.create({
        title: 'foo',
        uri: 'bar',
        remoteVersion: '1.1',
        localVersion: '1.0',
        hasUpdate: true
      }));
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-schema/form record=data}}
      */
      {
        "id": "cc8ZZvMb",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"record\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"data\",\"object/md-schema/form\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \s\n]+/g, '|').trim(), 'Title|URL|Version|1.0|Update|Available|(1.1)|Description|Type|Select|the|record|type|for|schema.|Apply|Globally?|No|Yes|');
      assert.dom('input').hasValue('foo', 'render form'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-schema/form record=data}}
              template block text
            {{/object/md-schema/form}}
          
      */
      {
        "id": "9mUTX/7O",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"record\"],[[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"data\",\"object/md-schema/form\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[ \s\n]+/g, '|').trim(), '|Title|URL|Version|1.0|Update|Available|(1.1)|Description|Type|Select|the|record|type|for|schema.|Apply|Globally?|No|Yes|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-simple-array-table/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md simple array table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = ['biz', 'baz']; // this.on('addItem', function(val) {
      //   this.model.pushObject(val);
      // });
      // this.on('addItem', function(val) {
      //   this.model.pushObject(val);
      // });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-simple-array-table}}
      */
      {
        "id": "GyqrCRDv",
        "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"object/md-simple-array-table\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Item|found.|Add|Item|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-simple-array-table
              title="FooBar"
              required=false
              plain=true
              value=model as |foo|
            }}
              <td>
                  {{foo.item.value}}
              </td>
            {{/object/md-simple-array-table}}
          
      */
      {
        "id": "MHoKcUIB",
        "block": "{\"symbols\":[\"foo\"],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"title\",\"required\",\"plain\",\"value\"],[\"FooBar\",false,true,[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        \"],[10,\"td\"],[12],[2,\"\\n            \"],[1,[32,1,[\"item\",\"value\"]]],[2,\"\\n        \"],[13],[2,\"\\n\"]],\"parameters\":[1]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-simple-array-table\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|FooBars|2|Add|FooBar|0|biz|Delete|1|baz|Delete|');
      await (0, _testHelpers.click)('.btn-info');
      assert.dom('.table tr').exists({
        count: 3
      }, 'addItem');
      await (0, _testHelpers.doubleClick)('.btn-danger');
      assert.equal(this.model.length, 1, 'deleteItem');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-source/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md source', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.source = {
        "description": "description",
        "sourceCitation": {
          "title": "title"
        },
        "metadataCitation": [{
          "title": "title0"
        }, {
          "title": "title1"
        }],
        "spatialResolution": {
          "measure": {
            "type": "distance",
            "value": 99.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        },
        "referenceSystem": {
          "referenceSystemType": "referenceSystemType",
          "referenceSystemIdentifier": {
            "identifier": "identifier"
          }
        },
        "sourceProcessStep": [{
          "description": "description0"
        }, {
          "description": "description1"
        }]
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-source profilePath="foobar" model=source}}
      */
      {
        "id": "SeTmDmV7",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"source\",\"object/md-source\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), 'Source|ID|Description|Scope|Select|type|of|resource.|Source|Citation|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|Metadata|Citation|2|Add|OK|#|Title|0|title0|Edit|Delete|1|title1|Edit|Delete|Spatial|Reference|System|Reference|System|Type|referenceSystemType|×|Reference|System|Identifier|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Authority|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|Spatial|Resolution|Scale|Factor|Level|Of|Detail|Measure|Measure|Type|distance|Value|Units|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-source profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-source}}
          
      */
      {
        "id": "VyiJ+dYt",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[30,[36,0],null,null]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"hash\",\"object/md-source\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Source|ID|Description|Scope|Select|type|of|resource.|Source|Citation|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Metadata|Citation|found.|Add|Metadata|Citation|Spatial|Reference|System|Reference|System|Type|Select|type|of|reference|system|used.|Reference|System|Identifier|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Authority|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|Spatial|Resolution|Scale|Factor|Level|Of|Detail|Measure|Measure|Type|The|type|of|measurement.|Value|Units|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-source/preview/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md source/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.source = {
        "description": "description",
        "sourceCitation": {
          "title": "title"
        },
        "metadataCitation": [{
          "title": "title0"
        }, {
          "title": "title1"
        }],
        "spatialResolution": {
          "measure": {
            "type": "distance",
            "value": 99.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        },
        "referenceSystem": {
          "referenceSystemType": "referenceSystemType",
          "referenceSystemIdentifier": {
            "identifier": "identifier"
          }
        },
        "sourceProcessStep": [{
          "description": "description0"
        }, {
          "description": "description1"
        }]
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-source/preview model=source profilePath="foobar"}}
      */
      {
        "id": "99OLtH6s",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"source\",\"object/md-source/preview\"]}",
        "meta": {}
      }));
      assert.dom('textarea').hasValue('description'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-source/preview model=source profilePath="foobar"}}
              template block text
            {{/object/md-source/preview}}
          
      */
      {
        "id": "Qa4k1Ksu",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"source\",\"object/md-source/preview\"]}",
        "meta": {}
      }));
      assert.dom('textarea').hasValue('description');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-spatial-info/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md spatial info', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = {
        spatialReferenceSystem: [{
          "referenceSystemType": "referenceSystemType",
          "referenceSystemIdentifier": {
            "identifier": "identifier"
          }
        }, {
          "referenceSystemType": "projected",
          "referenceSystemIdentifier": {
            "identifier": "Zone 10",
            "namespace": "UTM",
            "description": "Universal Transverse Mercator Zone 10 Seattle, Washington"
          }
        }, {
          "referenceSystemType": "geodeticGeographic2D",
          "referenceSystemIdentifier": {
            "identifier": "4326",
            "namespace": "urn:ogc:def:crs:EPSG",
            "description": "epsg projection 4326 - wgs 84 - Latitude Longitude",
            "authority": {
              "title": "European Petroleum Survey Group"
            }
          }
        }, {
          "referenceSystemType": "projected",
          "referenceSystemWKT": "PROJCS ['Wyoming 4901, Eastern Zone (1983, meters)', GEOGCS ['GRS 80', DATUM ['GRS 80', SPHEROID ['GRS 80', 6378137.000000, 298.257222]], PRIMEM ['Greenwich', 0.000000 ], UNIT ['Decimal Degree', 0.01745329251994330]], PROJECTION ['Transverse Mercator'], PARAMETER ['Scale_Factor', 0.999938], PARAMETER ['Central_Meridian', -105.166667], PARAMETER ['Latitude_Of_Origin', 40.500000], PARAMETER ['False_Easting', 200000.000000], UNIT ['Meter', 1.000000000000]]"
        }, {
          "referenceSystemType": "geodeticGeographic2D",
          "referenceSystemParameterSet": {
            "geodetic": {
              "datumIdentifier": {
                "identifier": "identifier"
              },
              "ellipsoidIdentifier": {
                "identifier": "identifier"
              },
              "semiMajorAxis": 9.9,
              "axisUnits": "axisUnits",
              "denominatorOfFlatteningRatio": 9.9
            }
          }
        }],
        spatialResolution: [{
          "scaleFactor": 99999
        }, {
          "measure": {
            "type": "distance",
            "value": 99.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        }, {
          "levelOfDetail": "levelOfDetail"
        }, {
          "geographicResolution": {
            "latitudeResolution": 9.9,
            "longitudeResolution": 9.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        }, {
          "bearingDistanceResolution": {
            "distanceResolution": 9.9,
            "distanceUnitOfMeasure": "",
            "bearingResolution": 9.9,
            "bearingUnitOfMeasure": "",
            "bearingReferenceDirection": "north",
            "bearingReferenceMeridian": "assumed"
          }
        }, {
          "coordinateResolution": {
            "abscissaResolutionX": 9.9,
            "ordinateResolutionY": 9.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        }],
        spatialRepresentationType: ["vector", "stereoModel"]
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-spatial-info profilePath="foobar" model=model}}
      */
      {
        "id": "/Q4bnxCS",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-spatial-info\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Spatial|Representation|Type|×|stereoModel|?|×|vector|?|Spatial|Reference|System|5|Add|OK|#|Reference|System|Type|Identifier|0|referenceSystemType|identifier|Edit|Delete|1|projected|Zone|10|Edit|Delete|2|geodeticGeographic2D|4326|Edit|Delete|3|projected|Not|Defined|Edit|Delete|4|geodeticGeographic2D|Not|Defined|Edit|Delete|Spatial|Resolution|6|Add|OK|#|Scale|Factor|Level|Of|Detail|Type|0|99999|Not|Defined|Not|Defined|Edit|Delete|1|Not|Defined|Not|Defined|distance|Edit|Delete|2|Not|Defined|levelOfDetail|Not|Defined|Edit|Delete|3|Not|Defined|Not|Defined|Not|Defined|Edit|Delete|4|Not|Defined|Not|Defined|Not|Defined|Edit|Delete|5|Not|Defined|Not|Defined|Not|Defined|Edit|Delete|Add|Spatial|Resolution|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-spatial-info profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-spatial-info}}
          
      */
      {
        "id": "9ofHfvVM",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[30,[36,0],null,null]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"hash\",\"object/md-spatial-info\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Spatial|Representation|Type|No|Spatial|Reference|System|found.|Add|Spatial|Reference|System|No|Spatial|Resolution|found.|Add|Spatial|Resolution|template|block|text|', 'block');
    });
    (0, _qunit.skip)('test actions', async function (assert) {
      assert.expect(1);
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-spatial-resolution/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md spatial resolution', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = {
        "scaleFactor": {
          scaleFactor: 99999
        },
        "measure": {
          "measure": {
            "type": "distance",
            "value": 99.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        },
        "levelOfDetail": {
          levelOfDetail: "levelOfDetail"
        },
        "geographicResolution": {
          geographicResolution: {
            "latitudeResolution": 9.9,
            "longitudeResolution": 9.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        },
        "bearingDistanceResolution": {
          bearingDistanceResolution: {
            "distanceResolution": 9.9,
            "distanceUnitOfMeasure": "",
            "bearingResolution": 9.9,
            "bearingUnitOfMeasure": "",
            "bearingReferenceDirection": "north",
            "bearingReferenceMeridian": "assumed"
          }
        },
        "coordinateResolution": {
          coordinateResolution: {
            "abscissaResolutionX": 9.9,
            "ordinateResolutionY": 9.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        }
      };
      var empty = "Scale|Factor|Level|Of|Detail|Measure|Measure|Type|The|type|of|measurement.|Value|Units|";
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-spatial-resolution profilePath="foobar" model=model.scaleFactor}}
      */
      {
        "id": "Uy7S9jZ+",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0,[\"scaleFactor\"]]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-spatial-resolution\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value, this.model.scaleFactor.scaleFactor, 'scaleFactor');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[1].disabled, 'level disabled');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[2].disabled, 'measure disabled');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-spatial-resolution profilePath="foobar" model=model.measure}}
      */
      {
        "id": "cBpLqP7N",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0,[\"measure\"]]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-spatial-resolution\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[2].value, this.model.measure.measure.value, 'measure');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[1].disabled, 'level disabled');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[0].disabled, 'scaleFactor disabled');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-spatial-resolution profilePath="foobar" model=model.levelOfDetail}}
      */
      {
        "id": "FrLa5op1",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0,[\"levelOfDetail\"]]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-spatial-resolution\"]}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[1].value, this.model.levelOfDetail.levelOfDetail, 'levelOfDetail');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[2].disabled, 'measure disabled');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[0].disabled, 'scaleFactor disabled');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-spatial-resolution profilePath="foobar" model=model.geographicResolution}}
      */
      {
        "id": "5YKCZpAr",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0,[\"geographicResolution\"]]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-spatial-resolution\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), empty, 'geographicResolution');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-spatial-resolution profilePath="foobar" model=model.bearingDistanceResolution}}
      */
      {
        "id": "8kAd0KZR",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0,[\"bearingDistanceResolution\"]]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-spatial-resolution\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), empty, 'bearingDistanceResolution');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-spatial-resolution profilePath="foobar" model=model.coordinateResolution}}
      */
      {
        "id": "CRgnDOb6",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0,[\"coordinateResolution\"]]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-spatial-resolution\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), empty, 'coordinateResolution'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-spatial-resolution model=(hash) profilePath="foobar"}}
              template block text
            {{/object/md-spatial-resolution}}
          
      */
      {
        "id": "iScH6Ao4",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"model\",\"profilePath\"],[[30,[36,0],null,null],\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"hash\",\"object/md-spatial-resolution\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|' + empty + 'template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-srs/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md srs', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.srs = {
        "referenceSystemType": "projected",
        "referenceSystemIdentifier": {
          "identifier": "identifier",
          "version": "version",
          "description": "description"
        }
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-srs profilePath="foobar" model=srs}}
      */
      {
        "id": "sQ+gc2OA",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"srs\",\"object/md-srs\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Reference|System|Type|projected|?|×|Reference|System|Identifier|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Authority|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|');
      var input = (0, _testHelpers.findAll)('input, textarea').mapBy('value').join('|');
      assert.equal(input, 'identifier|version|description|', 'input values'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-srs profilePath="foobar"}}
              template block text
            {{/object/md-srs}}
          
      */
      {
        "id": "76G1wxx3",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,[[\"profilePath\"],[\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"object/md-srs\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Reference|System|Type|Select|type|of|reference|system|used.|template|block|text|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-taxonomy/classification/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-taxonomy"], function (_testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md taxonomy/classification', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0].taxonomicClassification;
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-taxonomy/classification model=model profilePath="foobar"}}
      */
      {
        "id": "smZaqasn",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-taxonomy/classification\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|Kingdom|Animalia|(202423)|Edit|Delete|Add|Child|Subkingdom|Radiata|(914153)|Edit|Delete|Add|Child|Phylum|Cnidaria|(48738)|Edit|Delete|Add|Child|Subphylum|Medusozoa|(718920)|Edit|Delete|Add|Child|Class|Scyphozoa|(51483)|Edit|Delete|Add|Child|Subclass|Discomedusae|(718923)|Edit|Delete|Add|Child|Order|Rhizostomeae|(51756)|Edit|Delete|Add|Child|Family|Rhizostomatidae|(51911)|Edit|Delete|Add|Child|Genus|Rhopilema|(51919)|Edit|Delete|Add|Child|Species|Rhopilema|verrilli|(51920)|mushroom|jellyfish|Edit|Delete|Add|Child|');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-taxonomy/classification model=model preview=true profilePath="foobar"}}
      */
      {
        "id": "GPudaZlE",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\",\"preview\",\"profilePath\"],[[35,0],true,\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-taxonomy/classification\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Kingdom|Animalia|(202423)|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-taxonomy/classification profilePath="foobar"}}
              template block text
            {{/object/md-taxonomy/classification}}
          
      */
      {
        "id": "l5799c+e",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,[[\"profilePath\"],[\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"object/md-taxonomy/classification\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Classification|found.|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-taxonomy/classification/taxon/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-taxonomy"], function (_testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md taxonomy/classification/taxon', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(7);
      this.model = (0, _createTaxonomy.default)()[0].taxonomicClassification[0];

      this.delete = function (taxa) {
        assert.ok(taxa, 'called delete');
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-taxonomy/classification/taxon model=model deleteTaxa=delete top=top profilePath="foobar"}}
      */
      {
        "id": "0etNkTjA",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,3],null,[[\"model\",\"deleteTaxa\",\"top\",\"profilePath\"],[[35,2],[35,1],[35,0],\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"top\",\"delete\",\"model\",\"object/md-taxonomy/classification/taxon\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|'); // await click('.btn-info');

      await (0, _testHelpers.click)('.btn-success');
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Taxonomic|Level|Taxonomic|Name|Taxonomic|ID|Common|Names|1|Add|Common|Name|0|Delete|OK|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|', 'edit');
      await (0, _testHelpers.click)('.md-taxon-form footer .btn-info');
      await (0, _testHelpers.click)('.btn-danger');
      await (0, _testHelpers.click)('.btn-danger');
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|');
      await (0, _testHelpers.click)('.md-taxon .md-taxon .btn-info');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <ul class="list-group md-classification">
            {{object/md-taxonomy/classification/taxon model=model preview=false top=top profilePath="foobar"}}
          </ul>
      */
      {
        "id": "XiBREr4r",
        "block": "{\"symbols\":[],\"statements\":[[10,\"ul\"],[14,0,\"list-group md-classification\"],[12],[2,\"\\n      \"],[1,[30,[36,2],null,[[\"model\",\"preview\",\"top\",\"profilePath\"],[[35,1],false,[35,0],\"foobar\"]]]],[2,\"\\n    \"],[13]],\"hasEval\":false,\"upvars\":[\"top\",\"model\",\"object/md-taxonomy/classification/taxon\"]}",
        "meta": {}
      }));
      await (0, _testHelpers.waitFor)('.md-taxon-form', {
        timeout: 2000,
        count: 1
      });
      assert.dom('.md-taxon-body').isVisible({
        count: 4
      });
      assert.dom('.md-taxon-body.md-spotlight-target').isVisible();
      await (0, _testHelpers.click)('.md-taxon-form footer .btn-info');
      let del = (0, _testHelpers.findAll)('.md-taxon .md-taxon .btn-danger').lastObject;
      await (0, _testHelpers.click)(del);
      await (0, _testHelpers.click)(del); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-taxonomy/classification/taxon model=model profilePath="foobar"}}
              template block text
            {{/object/md-taxonomy/classification/taxon}}
          
      */
      {
        "id": "tl/3Bitm",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-taxonomy/classification/taxon\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-taxonomy/collection/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-taxonomy"], function (_testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md taxonomy/collection', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-taxonomy/collection model=model profilePath="foobar"}}
      */
      {
        "id": "aNR7/pG3",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-taxonomy/collection\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Taxonomic|System|1|Add|OK|#|Title|Modifications|0|More...|Delete|Classification|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|Kingdom|Animalia|(202423)|Edit|Delete|Add|Child|Subkingdom|Radiata|(914153)|Edit|Delete|Add|Child|Phylum|Cnidaria|(48738)|Edit|Delete|Add|Child|Subphylum|Medusozoa|(718920)|Edit|Delete|Add|Child|Class|Scyphozoa|(51483)|Edit|Delete|Add|Child|Subclass|Discomedusae|(718923)|Edit|Delete|Add|Child|Order|Rhizostomeae|(51756)|Edit|Delete|Add|Child|Family|Rhizostomatidae|(51911)|Edit|Delete|Add|Child|Genus|Rhopilema|(51919)|Edit|Delete|Add|Child|Species|Rhopilema|verrilli|(51920)|mushroom|jellyfish|Edit|Delete|Add|Child|Observers|1|Add|#|Role|Contacts|0|pointOfContact|?|×|Delete|General|Scope|Identification|Procedure|Identification|Completeness|Voucher|1|Add|OK|#|Specimen|0|Specimen|Edit|Delete|');
      var input = (0, _testHelpers.findAll)('form input, form textarea').mapBy('value').join('|');
      assert.equal(input, "Integrated Taxonomic Information System (ITIS)|modifications||Scope|Id Procedure|Id Completeness", 'input values'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-taxonomy/collection profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-taxonomy/collection}}
          
      */
      {
        "id": "6/N8CFh/",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[30,[36,0],null,null]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"hash\",\"object/md-taxonomy/collection\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Taxonomic|System|found.|Add|Taxonomic|System|Classification|No|Classification|found.|No|Observer|found.|Add|Observer|General|Scope|Identification|Procedure|Identification|Completeness|No|Voucher|found.|Add|Voucher|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-taxonomy/collection/system/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-taxonomy"], function (_testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md taxonomy/collection/system', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0].taxonomicSystem[0];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-taxonomy/collection/system model=model profilePath="foobar"}}
      */
      {
        "id": "nJQOnzZ5",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-taxonomy/collection/system\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Modifications|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|Dates|1|Add|Date|#|Date|Date|Type|Description|0|transmitted|?|×|Delete|Edition|Presentation|Form|×|webService|?|×|webSite|?|No|Responsible|Party|found.|Add|Responsible|Party|Online|Resource|1|Add|OK|#|Name|Uri|0|ITIS|website|https://www.itis.gov|Edit|Delete|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|Series|Name|Issue|Page|Other|Details|1|Add|0|Delete|Graphic|1|Add|OK|0|itis_logo.jpg:|Edit|Delete|');
      var input = (0, _testHelpers.findAll)('form input, form textarea').mapBy('value').join('|');
      assert.equal(input, "modifications|Integrated Taxonomic Information System (ITIS)|2019-02-26|Taxa imported from ITIS||||||Retrieved from the Integrated Taxonomic Information System on-line database, https://www.itis.gov.", 'input values'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-taxonomy/collection/system model=(hash) profilePath="foobar"}}
              template block text
            {{/object/md-taxonomy/collection/system}}
          
      */
      {
        "id": "GUJn3LmN",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"model\",\"profilePath\"],[[30,[36,0],null,null],\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"hash\",\"object/md-taxonomy/collection/system\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Modifications|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|Edition|Presentation|Form|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|Series|Name|Issue|Page|No|Other|Details|found.|Add|Other|Detail|No|Graphic|found.|Add|Graphic|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-taxonomy/collection/system/preview/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-taxonomy"], function (_testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md taxonomy/collection/system/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0].taxonomicSystem[0];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-taxonomy/collection/system/preview model=model profilePath="foobar"}}
      */
      {
        "id": "xKyqdQg3",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\",\"profilePath\"],[[35,0],\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-taxonomy/collection/system/preview\"]}",
        "meta": {}
      }));
      var input = (0, _testHelpers.findAll)('input, textarea').mapBy('value').join('|');
      assert.equal(input, "Integrated Taxonomic Information System (ITIS)|modifications", 'input values'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-taxonomy/collection/system/preview model=(hash) profilePath="foobar"}}
              template block text
            {{/object/md-taxonomy/collection/system/preview}}
          
      */
      {
        "id": "ZR5G6AQV",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"model\",\"profilePath\"],[[30,[36,0],null,null],\"foobar\"]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"hash\",\"object/md-taxonomy/collection/system/preview\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|");
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-taxonomy/collection/voucher/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-taxonomy"], function (_testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md taxonomy/collection/voucher', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0].voucher[0];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-taxonomy/collection/voucher profilePath="foobar" model=model}}
      */
      {
        "id": "JAOOwNXN",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-taxonomy/collection/voucher\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Specimen|Repository|Role|custodian|?|×|Contacts|');
      var input = (0, _testHelpers.findAll)('input, textarea').mapBy('value').join('|');
      assert.equal(input, "Specimen|", 'input values'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-taxonomy/collection/voucher profilePath="foobar" model=(hash repository=(hash))}}
              template block text
            {{/object/md-taxonomy/collection/voucher}}
          
      */
      {
        "id": "Qz9M18cu",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[30,[36,0],null,[[\"repository\"],[[30,[36,0],null,null]]]]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"hash\",\"object/md-taxonomy/collection/voucher\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Specimen|Repository|Role|Select|or|enter|a|role|Contacts|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-taxonomy/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-taxonomy"], function (_testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md taxonomy', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-taxonomy model=model index=0 profilePath="foobar"}}
      */
      {
        "id": "1ui33qDz",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"model\",\"index\",\"profilePath\"],[[35,0],0,\"foobar\"]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-taxonomy\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Collection|#0:|Integrated|Taxonomic|Information|System|(ITIS)|Edit|Collection|Delete|Collection|Kingdom|Fungi|(555705)|Kingdom|Kingdom|Animalia|(202423)|');
      await (0, _testHelpers.click)('li .icon');
      assert.equal((0, _testHelpers.find)('li').textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Subkingdom|Dikarya|(936287)|Division|Basidiomycota|(623881)|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-taxonomy}}
              template block text
            {{/object/md-taxonomy}}
          
      */
      {
        "id": "o/8jaQTT",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,0],null,null,[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"object/md-taxonomy\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Collection|#undefined|Edit|Collection|Delete|Collection|No|Classification|found.|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-time-period/component-test", ["@ember/test-helpers", "qunit", "ember-qunit", "moment"], function (_testHelpers, _qunit, _emberQunit, _moment) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md time period', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      var date = new Date("2016-10-14T13:10:15-0800");
      this.model = [{
        "id": "id",
        "description": "description",
        "identifier": {
          "identifier": "identifier",
          "namespace": "namespace"
        },
        "periodName": ["periodName0", "periodName1"],
        "startDateTime": date,
        "endDateTime": "2016-12-31",
        "timeInterval": {
          "interval": 9,
          "units": "year"
        },
        "duration": {
          "years": 1,
          "months": 1,
          "days": 1,
          "hours": 1,
          "minutes": 1,
          "seconds": 1
        }
      }, {
        "id": "id",
        "description": "description",
        "identifier": {
          "identifier": "identifier",
          "namespace": "namespace"
        },
        "periodName": ["periodName0", "periodName1"],
        "startGeologicAge": {
          "ageTimeScale": "ageTimeScale",
          "ageEstimate": "ageEstimate"
        },
        "endGeologicAge": {
          "ageTimeScale": "ageTimeScale",
          "ageEstimate": "ageEstimate"
        }
      }];
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-time-period profilePath="foobar" model=model.firstObject}}
      */
      {
        "id": "In5MpMVU",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0,[\"firstObject\"]]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-time-period\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Time|Period|Names|2|Add|Time|Period|Name|0|Delete|1|Delete|Interval|Interval|Amount|Time|Unit|year|×|Duration|Years|Months|Days|Hours|Minutes|Seconds|');
      var input = (0, _testHelpers.findAll)('form input, form textarea').mapBy('value').join('|');
      assert.equal(input, (0, _moment.default)(date).format('YYYY-MM-DD HH:mm:ss') + '|2016-12-31 00:00:00|identifier|description|periodName0|periodName1|9|1|1|1|1|1|1', 'input values');
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-time-period profilePath="foobar" model=model.lastObject}}
      */
      {
        "id": "k0SB9ZHv",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0,[\"lastObject\"]]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-time-period\"]}",
        "meta": {}
      }));
      var input1 = (0, _testHelpers.findAll)('form input, form textarea').mapBy('value').join('|');
      assert.equal(input1, "||identifier|description|periodName0|periodName1|||||||", 'geologic input values');
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Time|Period|Names|2|Add|Time|Period|Name|0|Delete|1|Delete|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|", 'geologic age'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-time-period profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-time-period}}
          
      */
      {
        "id": "GS2JSMfy",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[30,[36,0],null,null]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"hash\",\"object/md-time-period\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|No|Time|Period|Name|found.|Add|Time|Period|Name|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-transfer/component-test", ["@ember/test-helpers", "qunit", "ember-qunit"], function (_testHelpers, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md transfer', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = {
        "unitsOfDistribution": "unitsOfDistribution",
        "transferSize": 9.9,
        "onlineOption": [{
          "uri": "http://adiwg.org"
        }, {
          "uri": "http://adiwg.org/"
        }],
        "offlineOption": [{
          "mediumSpecification": {
            "title": "title0"
          }
        }, {
          "mediumSpecification": {
            "title": "title1"
          }
        }],
        "transferFrequency": {
          "months": 9
        },
        "distributionFormat": [{
          "formatSpecification": {
            "title": "title0"
          }
        }, {
          "formatSpecification": {
            "title": "title1"
          }
        }]
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-transfer profilePath="foobar" model=model}}
      */
      {
        "id": "hnAaxrw2",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-transfer\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Transfer|Size|(MB)|Distribution|units|Online|Option|2|Add|OK|#|Name|Uri|0|Not|Defined|http://adiwg.org|Edit|Delete|1|Not|Defined|http://adiwg.org/|Edit|Delete|Offline|Option|2|Add|OK|#|Title|0|title0|Edit|Delete|1|title1|Edit|Delete|Distribution|Formats|2|Add|#|Format|Name|Version|Compression|Method|URL|0|Delete|1|Delete|Transfer|Frequency|Years|Months|Days|Hours|Minutes|Seconds|');
      var input = (0, _testHelpers.findAll)('form input').mapBy('value').join('|');
      assert.equal(input, "9.9|unitsOfDistribution|title0||||title1|||||9||||", 'input values'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-transfer profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-transfer}}
          
      */
      {
        "id": "Cy/DcM5a",
        "block": "{\"symbols\":[],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"profilePath\",\"model\"],[\"foobar\",[30,[36,0],null,null]]],[[\"default\"],[{\"statements\":[[2,\"        template block text\\n\"]],\"parameters\":[]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"hash\",\"object/md-transfer\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Transfer|Size|(MB)|Distribution|units|No|Online|Option|found.|Add|Online|Option|No|Offline|Option|found.|Add|Offline|Option|No|Distribution|Format|found.|Add|Distribution|Format|Transfer|Frequency|Years|Months|Days|Hours|Minutes|Seconds|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-transfer/preview/component-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | object/md-transfer/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.model = {
        "unitsOfDistribution": "unitsOfDistribution",
        "transferSize": 9.9,
        "onlineOption": [{
          "uri": "http://adiwg.org"
        }, {
          "uri": "http://adiwg.org/"
        }],
        "offlineOption": [{
          "mediumSpecification": {
            "title": "title0"
          }
        }, {
          "mediumSpecification": {
            "title": "title1"
          }
        }],
        "transferFrequency": {
          "months": 9
        },
        "distributionFormat": [{
          "formatSpecification": {
            "title": "title0"
          }
        }, {
          "formatSpecification": {
            "title": "title1"
          }
        }]
      };
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        {{object/md-transfer/preview item=model}}
      */
      {
        "id": "qfM7LT6+",
        "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],null,[[\"item\"],[[35,0]]]]]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-transfer/preview\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|9.9|yes(2)|yes(2)|yes(2)|'); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            {{#object/md-transfer/preview isTable=false item=model as |t|}}
              transferSize: {{t.transferSize}}
            {{/object/md-transfer/preview}}
          
      */
      {
        "id": "dy9WMelG",
        "block": "{\"symbols\":[\"t\"],\"statements\":[[2,\"\\n\"],[6,[37,1],null,[[\"isTable\",\"item\"],[false,[35,0]]],[[\"default\"],[{\"statements\":[[2,\"        transferSize: \"],[1,[32,1,[\"transferSize\"]]],[2,\"\\n\"]],\"parameters\":[1]}]]],[2,\"    \"]],\"hasEval\":false,\"upvars\":[\"model\",\"object/md-transfer/preview\"]}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|transferSize:|9.9|');
    });
  });
});
define("mdeditor/tests/test-helper", ["mdeditor/app", "mdeditor/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("mdeditor/tests/unit/adapters/adapter-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Adapter | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let adapter = this.owner.lookup('adapter:application');
      assert.ok(adapter);
    });
  });
});
define("mdeditor/tests/unit/adapters/application-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Adapter | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      var adapter = this.owner.lookup('adapter:application');
      assert.ok(adapter);
    });
    (0, _qunit.test)('it has a importData method', function (assert) {
      var adapter = this.owner.lookup('adapter:application');
      assert.ok(typeof adapter.importData === 'function');
    });
    (0, _qunit.test)('it has a exportData method', function (assert) {
      var adapter = this.owner.lookup('adapter:application');
      assert.ok(typeof adapter.exportData === 'function');
    });
  });
});
define("mdeditor/tests/unit/helpers/bbox-to-poly-test", ["mdeditor/helpers/bbox-to-poly", "qunit"], function (_bboxToPoly, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Helper | bbox to poly', function () {
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _bboxToPoly.bboxToPoly)([{
        southLatitude: 1,
        northLatitude: 2,
        westLongitude: 3,
        eastLongitude: 4
      }]);
      assert.equal("[[1,3],[2,3],[2,4],[1,4]]", JSON.stringify(result));
    });
  });
});
define("mdeditor/tests/unit/helpers/get-dash-test", ["mdeditor/helpers/get-dash", "qunit"], function (_getDash, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Helper | get dash', function () {
    (0, _qunit.test)('it works', function (assert) {
      let obj = {
        foo: 'bar'
      };
      let result = (0, _getDash.getDash)([obj, 'foo']);
      assert.equal(result, 'bar', 'value');
      result = (0, _getDash.getDash)([obj, 'biz']);
      assert.equal(result, '--', 'dash');
    });
  });
});
define("mdeditor/tests/unit/helpers/make-range-test", ["mdeditor/helpers/make-range", "qunit"], function (_makeRange, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Helper | make range', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _makeRange.makeRange)([42]);
      assert.ok(result);
    });
  });
});
define("mdeditor/tests/unit/helpers/md-markdown-test", ["mdeditor/helpers/md-markdown", "qunit"], function (_mdMarkdown, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Helper | md markdown', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _mdMarkdown.mdMarkdown)('# Test');
      assert.equal(result.string.trim(), '<p>#</p>');
    });
  });
});
define("mdeditor/tests/unit/helpers/mod-test", ["mdeditor/helpers/mod", "qunit"], function (_mod, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Helper | mod', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _mod.mod)([42]);
      assert.ok(result);
    });
  });
});
define("mdeditor/tests/unit/initializers/leaflet-test", ["mdeditor/initializers/leaflet", "qunit"], function (_leaflet, _qunit) {
  "use strict";

  let application;
  (0, _qunit.module)('Unit | Initializer | leaflet', function (hooks) {
    hooks.beforeEach(function () {
      Ember.run(function () {
        application = Ember.Application.create();
        application.deferReadiness();
      });
    }); // Replace this with your real tests.

    (0, _qunit.test)('it works', function (assert) {
      _leaflet.default.initialize(application); // you would normally confirm the results of the initializer here


      assert.ok(true);
    });
  });
});
define("mdeditor/tests/unit/initializers/local-storage-export-test", ["mdeditor/initializers/local-storage-export", "qunit", "mdeditor/tests/helpers/destroy-app"], function (_localStorageExport, _qunit, _destroyApp) {
  "use strict";

  (0, _qunit.module)('Unit | Initializer | local storage export', function (hooks) {
    hooks.beforeEach(function () {
      Ember.run(() => {
        this.application = Ember.Application.create();
        this.application.deferReadiness();
      });
    });
    hooks.afterEach(function () {
      (0, _destroyApp.default)(this.application);
    }); // Replace this with your real tests.

    (0, _qunit.test)('it works', function (assert) {
      (0, _localStorageExport.initialize)(this.application); // you would normally confirm the results of the initializer here

      assert.ok(true);
    });
  });
});
define("mdeditor/tests/unit/instance-initializers/profile-test", ["mdeditor/instance-initializers/profile", "qunit", "mdeditor/tests/helpers/destroy-app"], function (_profile, _qunit, _destroyApp) {
  "use strict";

  (0, _qunit.module)('Unit | Instance Initializer | profile', function (hooks) {
    hooks.beforeEach(function () {
      Ember.run(() => {
        this.application = Ember.Application.create();
        this.appInstance = this.application.buildInstance();
      });
    });
    hooks.afterEach(function () {
      Ember.run(this.appInstance, 'destroy');
      (0, _destroyApp.default)(this.application);
    }); // Replace this with your real tests.

    (0, _qunit.test)('it works', function (assert) {
      (0, _profile.initialize)(this.appInstance); // you would normally confirm the results of the initializer here

      assert.ok(true);
    });
  });
});
define("mdeditor/tests/unit/instance-initializers/route-publish-test", ["mdeditor/instance-initializers/route-publish", "qunit", "mdeditor/tests/helpers/destroy-app"], function (_routePublish, _qunit, _destroyApp) {
  "use strict";

  (0, _qunit.module)('Unit | Instance Initializer | route publish', function (hooks) {
    hooks.beforeEach(function () {
      Ember.run(() => {
        this.application = Ember.Application.create();
        this.appInstance = this.application.buildInstance();
      });
    });
    hooks.afterEach(function () {
      Ember.run(this.appInstance, 'destroy');
      (0, _destroyApp.default)(this.application);
    });
    (0, _qunit.test)('it works', function (assert) {
      let a = [{
        route: 'test'
      }];
      this.appInstance.register('service:publish', Ember.Service.extend({
        catalogs: a
      }));
      (0, _routePublish.initialize)(this.appInstance);
      assert.ok(true);
    });
  });
});
define("mdeditor/tests/unit/instance-initializers/settings-sciencebase-test", ["mdeditor/instance-initializers/settings-sciencebase", "qunit", "mdeditor/tests/helpers/destroy-app"], function (_settingsSciencebase, _qunit, _destroyApp) {
  "use strict";

  (0, _qunit.module)('Unit | Instance Initializer | settings sciencebase', function (hooks) {
    hooks.beforeEach(function () {
      Ember.run(() => {
        this.application = Ember.Application.create();
        this.appInstance = this.application.buildInstance();
      });
    });
    hooks.afterEach(function () {
      Ember.run(this.appInstance, 'destroy');
      (0, _destroyApp.default)(this.application);
    });
    let a = []; // Replace this with your real tests.

    (0, _qunit.test)('it works', function (assert) {
      this.appInstance.register('service:publish', Ember.Service.extend({
        catalogs: a
      }));
      (0, _settingsSciencebase.initialize)(this.appInstance); // you would normally confirm the results of the initializer here

      assert.ok(this.appInstance.lookup('service:publish').catalogs.findBy('route', 'sciencebase'));
    });
  });
});
define("mdeditor/tests/unit/instance-initializers/settings-test", ["mdeditor/instance-initializers/settings", "qunit", "mdeditor/tests/helpers/destroy-app"], function (_settings, _qunit, _destroyApp) {
  "use strict";

  (0, _qunit.module)('Unit | Instance Initializer | settings', function (hooks) {
    hooks.beforeEach(function () {
      Ember.run(() => {
        this.application = Ember.Application.create();
        this.appInstance = this.application.buildInstance();
      });
    });
    hooks.afterEach(function () {
      Ember.run(this.appInstance, 'destroy');
      (0, _destroyApp.default)(this.application);
    }); // Replace this with your real tests.

    (0, _qunit.test)('it works', function (assert) {
      (0, _settings.initialize)(this.appInstance); // you would normally confirm the results of the initializer here

      assert.ok(true);
    });
  });
});
define("mdeditor/tests/unit/mixins/cancel-test", ["mdeditor/mixins/cancel", "qunit"], function (_cancel, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Mixin | cancel', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let CancelObject = Ember.Object.extend(_cancel.default);
      let subject = CancelObject.create();
      assert.ok(subject);
    });
  });
});
define("mdeditor/tests/unit/mixins/hash-poll-test", ["mdeditor/mixins/hash-poll", "qunit"], function (_hashPoll, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Mixin | hash poll', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let HashPollObject = Ember.Object.extend(_hashPoll.default);
      let subject = HashPollObject.create();
      assert.ok(subject);
    });
  });
});
define("mdeditor/tests/unit/mixins/object-template-test", ["mdeditor/mixins/object-template", "qunit"], function (_objectTemplate, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Mixin | object template', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let ObjectTemplateObject = Ember.Object.extend(_objectTemplate.default);
      let subject = ObjectTemplateObject.create();
      assert.ok(subject);
    });
  });
});
define("mdeditor/tests/unit/mixins/scroll-to-test", ["mdeditor/mixins/scroll-to", "qunit"], function (_scrollTo, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Mixin | scroll to', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let ScrollToObject = Ember.Object.extend(_scrollTo.default);
      let subject = ScrollToObject.create();
      assert.ok(subject);
    });
  });
});
define("mdeditor/tests/unit/models/base-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | base', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let model = Ember.run(() => this.owner.lookup('service:store').modelFor('base')); // let store = this.store();

      assert.equal(model.modelName, 'base');
    });
  });
});
define("mdeditor/tests/unit/models/contact-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | contact', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let model = Ember.run(() => this.owner.lookup('service:store').createRecord('contact')); // var store = this.store();

      assert.ok(!!model);
    });
    (0, _qunit.test)('should correctly compute title', function (assert) {
      const me = Ember.run(() => this.owner.lookup('service:store').createRecord('contact'));
      assert.expect(3);
      me.set('json.name', 'bar');
      me.set('json.positionName', 'foo');
      assert.equal(me.get('title'), 'bar');
      me.set('json.name', null);
      me.set('json.isOrganization', false);
      assert.equal(me.get('title'), 'foo');
      me.set('json.isOrganization', true);
      assert.equal(me.get('title'), null);
    });
    (0, _qunit.test)('should correctly compute icon', function (assert) {
      const me = Ember.run(() => this.owner.lookup('service:store').createRecord('contact'));
      assert.expect(2);
      me.set('json.isOrganization', true);
      assert.equal(me.get('icon'), 'users');
      me.set('json.isOrganization', false);
      assert.equal(me.get('icon'), 'user');
    });
  });
});
define("mdeditor/tests/unit/models/dictionary-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | dictionary', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var model = Ember.run(() => this.owner.lookup('service:store').createRecord('dictionary')); // var store = this.store();

      assert.ok(!!model);
    });
    (0, _qunit.test)('should correctly compute title', function (assert) {
      const me = Ember.run(() => this.owner.lookup('service:store').createRecord('dictionary'));
      assert.expect(1);
      me.set('json.dataDictionary.citation.title', 'bar');
      assert.equal(me.get('title'), 'bar');
    });
  });
});
define("mdeditor/tests/unit/models/record-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | record', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var model = Ember.run(() => this.owner.lookup('service:store').createRecord('record')); // var store = this.store();

      assert.ok(!!model);
    });
    (0, _qunit.test)('should correctly compute title', function (assert) {
      const me = Ember.run(() => this.owner.lookup('service:store').createRecord('record'));
      assert.expect(1);
      me.set('json.metadata.resourceInfo.citation.title', 'foo');
      assert.equal(me.get('title'), 'foo');
    });
    (0, _qunit.test)('should correctly compute icon', function (assert) {
      const me = Ember.run(() => this.owner.lookup('service:store').createRecord('record'));
      const list = this.owner.lookup('service:icon');
      assert.expect(1);
      me.set('json.metadata.resourceInfo.resourceType.firstObject.type', 'project');
      assert.equal(me.get('icon'), list.get('project'));
    });
  });
});
define("mdeditor/tests/unit/models/setting-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | setting', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let model = Ember.run(() => this.owner.lookup('service:store').createRecord('setting')); // let store = this.store();

      assert.ok(!!model);
    });
  });
});
define("mdeditor/tests/unit/pods/contact/new/id/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | contact/new/id', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:contact/new/id');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/contact/new/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | contact/new/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:contact/new/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/contact/show/edit/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | contact/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:contact/show/edit');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/contact/show/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | contact/show/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:contact/show/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/contact/show/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | contact/show', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:contact/show');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/contacts/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | contacts', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:contacts');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dashboard/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dashboard', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:dashboard');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionaries/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionaries', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:dictionaries');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/new/id/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/new/id', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/new/id');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/new/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/new/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/new/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/citation/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/citation/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/citation/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/citation/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/citation/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/citation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/citation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/citation/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit/citation/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit/citation/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/citation/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit/citation/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/citation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit/citation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/item/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit/item', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit/item');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/attribute/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/attribute/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/attribute/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/attribute/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/attribute', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/attribute');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/citation/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/citation/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/citation/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/citation/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/citation/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/citation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/citation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/import/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/import', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/import');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:dictionary/show/edit/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:dictionary/show/edit');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | dictionary/show', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:dictionary/show');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/error/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | error', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:error');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/export/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | save', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:save');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/help/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | help', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:help');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/import/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | import', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:import');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/main/initializer-test-test", ["mdeditor/initializers/main", "qunit", "ember-qunit", "mdeditor/tests/unit/helpers/destroy-app"], function (_main, _qunit, _emberQunit, _destroyApp) {
  "use strict";

  (0, _qunit.module)('Unit | Initializer | main', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    hooks.beforeEach(function () {
      this.TestApplication = Ember.Application.extend();
      this.TestApplication.initializer({
        name: 'initializer under test',
        initialize: _main.initialize
      });
      this.application = this.TestApplication.create({
        autoboot: false
      });
    });
    hooks.afterEach(function () {
      (0, _destroyApp.default)(this.application);
    }); // Replace this with your real tests.

    (0, _qunit.test)('it works', async function (assert) {
      await this.application.boot();
      assert.ok(true);
    });
  });
});
define("mdeditor/tests/unit/pods/not-found/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | not found', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:not-found');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/publish/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | publish/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:publish/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/publish/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | publish', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:publish');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/new/id/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/new/id', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/new/id');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/new/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/new/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/new/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/associated/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/associated/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/associated/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/associated/resource/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/associated/resource/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/associated/resource/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/associated/resource/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/associated/resource', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/associated/resource');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/associated/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/edit/associated', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/associated');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/constraint/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/constraint/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/constraint/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/constraint/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/constraint', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/constraint');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/coverages/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/edit/coverages', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/coverages');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/dictionary/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/dictionary', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/dictionary');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/distribution/distributor/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/distribution/distributor/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/distribution/distributor/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/distribution/distributor/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/distribution/distributor', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/distribution/distributor');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/distribution/distributor/transfer/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/distribution/distributor/transfer', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/distribution/distributor/transfer');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/distribution/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/distribution/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/distribution/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/distribution/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/edit/distribution', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/distribution');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/documents/citation/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/documents/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/documents/citation/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/documents/citation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/documents/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/documents/citation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/documents/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/documents/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/documents/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/documents/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/edit/documents', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/documents');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/extent/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/extent/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/extent/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/funding/allocation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/funding/allocation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/funding/allocation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/funding/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/funding/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/funding/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/funding/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/funding', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/funding');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/grid/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/edit/grid', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/grid');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/keywords/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/keywords/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/keywords/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/keywords/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/edit/keywords', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/keywords');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/keywords/thesaurus/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/keywords/thesaurus', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/keywords/thesaurus');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/citation/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/citation/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/citation/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/citation/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/citation/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/citation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/citation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/source/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/source/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/source/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/source/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/source', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/source');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/step/citation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/step/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/step/citation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/step/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/step/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/step/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/step/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/step', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/step');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/main/citation/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/main/citation/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/main/citation/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/main/citation/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/main/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/main/citation/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/main/citation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/main/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/main/citation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/main/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/main/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/main/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/main/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/main', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/main');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/alternate/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/alternate/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/alternate/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/alternate/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/alternate/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/alternate/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/alternate/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/alternate', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/alternate');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/parent/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/parent/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/parent/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/parent/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/parent/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/parent/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/parent/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/parent', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/parent');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/spatial/extent/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/extent/spatial', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/extent/spatial');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/spatial/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/spatial/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/spatial/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/spatial/raster/attribute/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/spatial/raster/attribute', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/spatial/raster/attribute');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/spatial/raster/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/spatial/raster', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/spatial/raster');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/spatial/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/spatial', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/spatial');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/collection/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/collection/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/itis/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/collection/itis', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/collection/itis');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/collection', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/collection');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/system/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/collection/system/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/collection/system/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/system/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/collection/system', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/collection/system');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/taxonomy/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/taxonomy/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/translate/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | record/show/translate', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/translate');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/records/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | records', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:records');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | settings/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:settings/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/main/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | settings/main', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:settings/main');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/profile/index/controller-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | settings/profile/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:settings/profile/index');
      assert.ok(controller);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/profile/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | settings/profile/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:settings/profile/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/profile/manage/controller-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | settings/profile/manage', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:settings/profile/manage');
      assert.ok(controller);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/profile/manage/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | settings/profile/manage', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:settings/profile/manage');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/profile/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | settings/profile', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:settings/profile');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | settings', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:settings');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/validation/controller-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | settings/validation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:settings/validation');
      assert.ok(controller);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/validation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | settings/validation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:settings/validation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/translate/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | translate', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:translate');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/routes/application-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:application');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/routes/index-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/routes/publish/sciencebase-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | publish/sciencebase', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:publish/sciencebase');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/serializers/application-test", ["ember-data", "qunit", "ember-qunit"], function (_emberData, _qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Serializer | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it serializes records', function (assert) {
      assert.expect(2);
      let serializer = this.owner.lookup('serializer:application');
      let store = this.owner.lookup('service:store');
      let record;
      const expected = {
        "data": {
          "attributes": {
            "name": "foo",
            "skill": "bar",
            "games-played": "[100,200]"
          },
          "type": "tests"
        }
      };
      const data = {
        id: 1,
        name: 'foo',
        skill: 'bar',
        gamesPlayed: [100, 200]
      };

      let model = _emberData.default.Model.extend({
        name: _emberData.default.attr(),
        skill: _emberData.default.attr(),
        gamesPlayed: _emberData.default.attr('json')
      });

      this.owner.register('model:test', model);
      Ember.run(function () {
        record = store.createRecord('test', data);
      });
      assert.deepEqual(record.serialize(), expected, 'record serialized OK');
      assert.deepEqual(serializer.serialize(record._createSnapshot()), expected, 'serialized snapshot OK');
    });
  });
});
define("mdeditor/tests/unit/serializers/serializer-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Serializer | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let serializer = store.serializerFor('application');
      assert.ok(serializer);
    });
    (0, _qunit.test)('it serializes records', function (assert) {
      let store = this.owner.lookup('service:store');
      let record = store.createRecord('application', {});
      let serializedRecord = record.serialize();
      assert.ok(serializedRecord);
    });
  });
});
define("mdeditor/tests/unit/services/cleaner-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | cleaner', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:cleaner');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/codelist-test", ["qunit", "ember-qunit", "mdcodes/resources/js/mdcodes.js"], function (_qunit, _emberQunit, _mdcodes) {
  "use strict";

  (0, _qunit.module)('Unit | Service | codelist', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('all codelists are present', function (assert) {
      var service = this.owner.lookup('service:codelist');
      Object.keys(_mdcodes.default).forEach(function (key) {
        if (key === 'default') return;
        const name = key.replace(/^(iso_|adiwg_)/, '');
        assert.ok(service.get(name), name + ' is present.');
      });
    });
  });
});
define("mdeditor/tests/unit/services/contacts-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | contacts', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:contacts');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/custom-profile-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | custom-profile', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:custom-profile');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/icon-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | icon', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      var service = this.owner.lookup('service:icon');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/itis-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | itis', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:itis');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/jsonvalidator-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | jsonvalidator', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('test jsonapi validation', function (assert) {
      var service = this.owner.lookup('service:jsonvalidator');
      var obj = {
        "data": [{
          "id": "8ke11eu1",
          "attributes": {
            "profile": "full",
            "json": "{}",
            "date-updated": "2016-09-16T22:08:04.425Z"
          },
          "type": "records",
          "meta": {
            "title": "ytr",
            "export": true
          }
        }, {
          "id": "spt9cadc",
          "attributes": {
            "json": "{}",
            "date-updated": "2016-09-16T22:08:11.080Z"
          },
          "type": "contacts",
          "meta": {
            "title": "ewrrrrrrrrrrrrrr",
            "export": true
          }
        }]
      };
      assert.ok(service.validator.validate('jsonapi', obj));
    });
  });
});
define("mdeditor/tests/unit/services/keyword-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | keyword', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:keyword');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/local-storage-monitor-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | localStorageMonitor', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      const localStorageMonitor = this.owner.lookup('service:local-storage-monitor');
      assert.ok(localStorageMonitor);
    });
  });
});
define("mdeditor/tests/unit/services/mdjson-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | mdjson', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:mdjson');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/patch-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | patch', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:patch');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/profile-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | profile', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      var service = this.owner.lookup('service:profile');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/publish-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | publish', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:publish');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/schemas-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | schemas', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:schemas');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/settings-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | settings', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:settings');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/slider-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | slider', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:slider');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/spotlight-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | spotlight', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:spotlight');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/transforms/json-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Transform | json', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it deserialized', function (assert) {
      let transform = this.owner.lookup('transform:json');
      let obj = transform.deserialize('{"foo":"bar"}');
      assert.equal(obj.get('foo'), "bar");
      assert.equal(Object.keys(obj)[0], 'foo');
      assert.equal(Object.keys(obj).length, 1);
    });
    (0, _qunit.test)('it serialized', function (assert) {
      let transform = this.owner.lookup('transform:json');
      assert.equal(transform.serialize({
        foo: 'bar'
      }), '{"foo":"bar"}');
    });
  });
});
define("mdeditor/tests/unit/utils/config-test", ["mdeditor/utils/config", "qunit"], function (_config, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | config', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = _config.default.name;
      assert.equal(result, 'ScienceBase');
    });
  });
});
define("mdeditor/tests/unit/utils/md-interpolate-test", ["mdeditor/utils/md-interpolate", "qunit"], function (_mdInterpolate, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | md-interpolate', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      assert.expect(2);
      let note = "The attribute <em>${value1}</em> has an associated domain: <strong>${value2}</strong>.";
      let result = (0, _mdInterpolate.interpolate)(note, {
        value1: 'foo',
        value2: 'bar'
      });
      assert.equal(result, 'The attribute <em>foo</em> has an associated domain: <strong>bar</strong>.');
      let result2 = (0, _mdInterpolate.parseArgs)(note);
      assert.deepEqual(result2, ['value1', 'value2']);
    });
  });
});
define("mdeditor/tests/unit/utils/md-object-size-test", ["mdeditor/utils/md-object-size", "qunit"], function (_mdObjectSize, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | md-object-size', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('calculates size of object and percent', function (assert) {
      //set up a before hook that mimics local storage and use it to calculate storage
      assert.ok((0, _mdObjectSize.default)());
    });
  });
});
define("mdeditor/tests/unit/utils/md-object-test", ["mdeditor/utils/md-object", "qunit"], function (_mdObject, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | md-object', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      assert.equal(_mdObject.default.isEmpty({}), true);
      assert.equal(_mdObject.default.isEmpty({
        foo: ''
      }), true);
      assert.equal(_mdObject.default.isEmpty({
        foo: []
      }), true);
      assert.equal(_mdObject.default.isEmpty({
        foo: 'bar'
      }), false);
      assert.equal(_mdObject.default.isEmpty({
        foo: {
          bar: {}
        }
      }), true);
      assert.equal(_mdObject.default.isEmpty({
        foo: false
      }), false);
    });
  });
});
define("mdeditor/tests/unit/utils/sb-tree-node-test", ["mdeditor/utils/sb-tree-node", "qunit"], function (_sbTreeNode, _qunit) {
  "use strict";

  (0, _qunit.module)('Unit | Utility | sb tree node', function () {
    (0, _qunit.test)('it works', function (assert) {
      assert.expect(2);

      let result = _sbTreeNode.default.create({
        _record: {
          recordId: 'theid'
        } //config: this.get('config')

      });

      assert.equal(result.uuid, 'theid');
      assert.equal(result.uuid, result.identifier, 'set ids');
    });
  });
});
define("mdeditor/tests/unit/validators/array-required-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Validator | array-required', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it works', function (assert) {
      var validator = this.owner.lookup('validator:array-required');
      assert.ok(validator);
    });
  });
});
define("mdeditor/tests/unit/validators/array-valid-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Validator | array-valid', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it works', function (assert) {
      var validator = this.owner.lookup('validator:array-valid');
      assert.ok(validator);
    });
  });
});
define('mdeditor/config/environment', [], function() {
  var prefix = 'mdeditor';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('mdeditor/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
