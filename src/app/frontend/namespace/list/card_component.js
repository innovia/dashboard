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

import {GlobalStateParams} from '../../common/resource/globalresourcedetail';
import {stateName} from '../../namespace/detail/state';

/**
 * Controller for the namespace card.
 *
 * @final
 */
class NamespaceCardController {
  /**
   * @param {!ui.router.$state} $state
   * @param {!angular.$interpolate} $interpolate
   * @ngInject
   */
  constructor($state, $interpolate) {
    /**
     * Initialized from the scope.
     * @export {!backendApi.Namespace}
     */
    this.namespace;

    /** @private {!ui.router.$state} */
    this.state_ = $state;

    /** @private */
    this.interpolate_ = $interpolate;
  }

  /**
   * Returns true if namespace is in active phase.
   * @return {boolean}
   * @export
   */
  isActive() {
    return this.namespace.phase === 'Active';
  }

  /**
   * Returns true if namespace is in terminating phase.
   * @return {boolean}
   * @export
   */
  isTerminating() {
    return this.namespace.phase === 'Terminating';
  }

  /**
   * @return {string}
   * @export
   */
  getNamespaceDetailHref() {
    return this.state_.href(stateName, new GlobalStateParams(this.namespace.objectMeta.name));
  }

  /**
   * @export
   * @param  {string} creationDate - creation date of the namespace
   * @return {string} localized tooltip with the formated creation date
   */
  getCreatedAtTooltip(creationDate) {
    let filter = this.interpolate_(`{{date | date}}`);
    /**
     * @type {string} @desc Tooltip 'Created at [some date]' showing the exact creation time of
     * namespace.
     */
    let MSG_NAMESPACE_LIST_CREATED_AT_TOOLTIP =
        goog.getMsg('Created at {$creationDate}', {'creationDate': filter({'date': creationDate})});
    return MSG_NAMESPACE_LIST_CREATED_AT_TOOLTIP;
  }
}

/**
 * @return {!angular.Component}
 */
export const namespaceCardComponent = {
  bindings: {
    'namespace': '=',
  },
  controller: NamespaceCardController,
  templateUrl: 'namespace/list/card.html',
};
