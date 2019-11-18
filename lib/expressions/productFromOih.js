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

module.exports.getExpression = (msg) => {
  if (Object.keys(msg.body).length === 0 && msg.body.constructor === Object) {
    return msg.body;
  }
  
  const expression = {
        ItemMaster: {
            ItemMasterHeader: {
                ItemID : [
                    {
                        ID:{
                            schemeID: 'DISPLAY_IDENTIFIER',
                            schemeAgencyID: 'www.logisticsmall.com',
                            value: msg.body.data.articleNo
                        } 
                    },
                    {
                        ID:{
                            schemeID: 'BOID',
                            schemeAgencyID: 'www.logisticsmall.com',
                            value: msg.body.data.gtin
                        }
                    }
                ],
                Description: msg.body.data.description,
                BaseQuantityClassification: {
                    type: 'COUNTABLE',
                    unit: msg.body.data.units.Unit.description
                }
            }
        }
  };
  return expression;
};
