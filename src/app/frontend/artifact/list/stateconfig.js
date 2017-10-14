// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {breadcrumbsConfig} from '../../common/components/breadcrumbs/service';
import {stateName as parentStateName} from '../../config/state';

import {stateName as parentState, stateUrl} from '../state';
import {ArtifactListController} from './controller';

/**
 * I18n object that defines strings for translation used in this file.
 */
const i18n = {
  /** @type {string} @desc Label 'Config Maps' that appears as a breadcrumbs on the action bar. */
  MSG_BREADCRUMBS_ARTIFACT_LABEL: goog.getMsg('Artifacts'),
};

/**
 * Config state object for the Config Map list view.
 *
 * @type {!ui.router.StateConfig}
 */
export const config = {
  url: stateUrl,
  parent: parentState,
  // resolve: {
  //   'artifactList': resolveArtifactList,
  // },
  data: {
    [breadcrumbsConfig]: {
      'label': i18n.MSG_BREADCRUMBS_ARTIFACT_LABEL,
      'parent': parentStateName,
    },
  },
  views: {
    '': {
      controller: ArtifactListController,
      controllerAs: '$ctrl',
      templateUrl: 'artifact/list/list.html',
    },
  },
};

/**
 * @param {!angular.$resource} $resource
 * @return {!angular.Resource}
 * @ngInject
 */
export function artifactListResource($resource) {
  return $resource('artifact');
}

/**
 * @param {!angular.Resource} kdArtifactListResource
 * @param {!./../../chrome/state.StateParams} $stateParams
 * @param {!./../../common/dataselect/service.DataSelectService} kdDataSelectService
 * @return {!angular.$q.Promise}
 * @ngInject
 */
export function resolveArtifactList(kdArtifactListResource, kdDataSelectService) {
  let query = kdDataSelectService.getDefaultResourceQuery();
  return kdArtifactListResource.get(query).$promise;
}
