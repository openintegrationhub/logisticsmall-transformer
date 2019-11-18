/* eslint "max-len":  ["error", { "code": 170 }] */

/**
 * Copyright 2018 Wice GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * Edited code
 * Copyright 2018 Logata Digital Solutions GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const jsonata = require('jsonata');

module.exports.getExpression = (msg) => {
  if (Object.keys(msg.body).length === 0 && msg.body.constructor === Object) {
    return msg.body;
  }

  const itemNoExp = '$filter($$, function($outer) { $outer.schemeID = "DISPLAY_IDENTIFIER"}';
  const itemBoidExp = '$filter($$, function($outer) { $outer.schemeID = "BOID"}';
  const jsonataItemNoExp = jsonata(itemNoExp);
  const jsonataItemBoidExp = jsonata(itemBoidExp);
  const itemNo = jsonataItemNoExp.evaluate(msg.body.data.ItemMaster.ItemMasterHeader.ItemID);
  const boId = jsonataItemBoidExp.evaluate(msg.body.data.ItemMaster.ItemMasterHeader.ItemID);

  const expression = {
    meta: {
      recordUid: msg.body.meta.recordUid,
      operation: msg.body.operation,
      applicationUid: (msg.body.meta.applicationUid !== undefined && msg.body.meta.applicationUid !== null) ? msg.body.meta.applicationUid : 'appUid not set yet',
      iamToken: (msg.body.meta.iamToken !== undefined && msg.body.meta.iamToken !== null) ? msg.body.meta.iamToken : undefined,
      domainId: '5d9b2511d48c29001a202169',
      schemaUri: 'product',
    },
    data: {
      articleNo: itemNo.ID.value,
      description: msg.body.data.ItemMaster.ItemMasterHeader.Description,
      gtin: boId.ID.value,
      units:[
          {
              Unit: {
                  description: msg.body.data.ItemMaster.ItemMasterHeader.BaseQuantityClassification.unit
              }
          } 
      ]
    }
  };
  return expression;
};
