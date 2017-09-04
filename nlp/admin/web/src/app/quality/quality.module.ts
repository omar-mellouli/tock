/*
 * Copyright (C) 2017 VSCT
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {AuthGuard} from "../core/auth/auth.guard";
import {ApplicationsModule} from "../applications/applications.module";
import {ApplicationResolver} from "../core/application.resolver";

import {MomentModule} from "angular2-moment";
import {TestIntentErrorComponent} from "../test/test-intent-error.component";
import {TestEntityErrorComponent} from "../test/test-entity-error.component";
import {ChartsModule} from "ng2-charts";
import {TestBuildsComponent} from "../test/test-builds.component";
import {QualityTabsComponent} from "./quality-tabs.component";
import {QualityService} from "./quality.service";
import {NlpModule} from "../nlp-tabs/nlp.module";
import {LogStatsComponent} from "../logs/log-stats.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: QualityTabsComponent,
    resolve: {
      application: ApplicationResolver
    },
    children: [
      {
        path: '',
        component: TestBuildsComponent
      },
      {
        path: 'log-stats',
        component: LogStatsComponent
      },
      {
        path: 'test-builds',
        component: TestBuildsComponent
      },
      {
        path: 'test-intent-errors',
        component: TestIntentErrorComponent
      },
      {
        path: 'test-entity-errors',
        component: TestEntityErrorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QualityRoutingModule {
}

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    QualityRoutingModule,
    ApplicationsModule,
    NlpModule,
    MomentModule,
    ChartsModule
  ],
  declarations: [
    QualityTabsComponent,
    TestIntentErrorComponent,
    TestEntityErrorComponent,
    TestBuildsComponent,
    LogStatsComponent
  ],
  exports: [],
  providers: [
    QualityService
  ],
  entryComponents: []
})
export class QualityModule {
}
