"use strict";
(self["webpackChunkfinancial_education_app"] = self["webpackChunkfinancial_education_app"] || []).push([["main"],{

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _services_user_profile_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/user-profile.service */ 9618);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _components_home_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/home.component */ 327);
/* harmony import */ var _components_profile_analysis_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/profile-analysis.component */ 3555);
/* harmony import */ var _components_story_generation_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/story-generation.component */ 1787);
/* harmony import */ var _components_quiz_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/quiz.component */ 4148);
/* harmony import */ var _components_rewards_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/rewards.component */ 4906);








function AppComponent_app_home_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "app-home");
  }
}
function AppComponent_app_profile_analysis_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "app-profile-analysis", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("readStories", function AppComponent_app_profile_analysis_1_Template_app_profile_analysis_readStories_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r5.navigateToStory());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function AppComponent_app_story_generation_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "app-story-generation", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("backToProfile", function AppComponent_app_story_generation_2_Template_app_story_generation_backToProfile_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r7.navigateToHome());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function AppComponent_app_quiz_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "app-quiz");
  }
}
function AppComponent_app_rewards_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "app-rewards");
  }
}
class AppComponent {
  userProfileService;
  title = 'Financial Education App';
  currentScreen = 'home';
  constructor(userProfileService) {
    this.userProfileService = userProfileService;
    // Setup navigation methods in service
    this.userProfileService.navigateToHome = () => this.navigateToHome();
    this.userProfileService.navigateToStory = () => this.navigateToStory();
    this.userProfileService.navigateToQuiz = () => this.navigateToQuiz();
    this.userProfileService.navigateToRewards = () => this.navigateToRewards();
  }
  navigateToHome() {
    this.currentScreen = 'home';
  }
  navigateToProfile() {
    this.currentScreen = 'profile';
  }
  navigateToStory() {
    this.currentScreen = 'story';
  }
  navigateToQuiz() {
    this.currentScreen = 'quiz';
  }
  navigateToRewards() {
    this.currentScreen = 'rewards';
  }
  static ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_user_profile_service__WEBPACK_IMPORTED_MODULE_0__.UserProfileService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["app-root"]],
    decls: 5,
    vars: 5,
    consts: [[4, "ngIf"], [3, "readStories", 4, "ngIf"], [3, "backToProfile", 4, "ngIf"], [3, "readStories"], [3, "backToProfile"]],
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, AppComponent_app_home_0_Template, 1, 0, "app-home", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, AppComponent_app_profile_analysis_1_Template, 1, 0, "app-profile-analysis", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, AppComponent_app_story_generation_2_Template, 1, 0, "app-story-generation", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, AppComponent_app_quiz_3_Template, 1, 0, "app-quiz", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, AppComponent_app_rewards_4_Template, 1, 0, "app-rewards", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.currentScreen === "home");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.currentScreen === "profile");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.currentScreen === "story");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.currentScreen === "quiz");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.currentScreen === "rewards");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _components_home_component__WEBPACK_IMPORTED_MODULE_1__.HomeComponent, _components_profile_analysis_component__WEBPACK_IMPORTED_MODULE_2__.ProfileAnalysisComponent, _components_story_generation_component__WEBPACK_IMPORTED_MODULE_3__.StoryGenerationComponent, _components_quiz_component__WEBPACK_IMPORTED_MODULE_4__.QuizComponent, _components_rewards_component__WEBPACK_IMPORTED_MODULE_5__.RewardsComponent],
    styles: ["body[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n  background: #f5f7fa;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxTQUFTO0VBQ1QsVUFBVTtFQUNWLG1CQUFtQjtBQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImJvZHkge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGJhY2tncm91bmQ6ICNmNWY3ZmE7XG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _components_home_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/home.component */ 327);
/* harmony import */ var _components_profile_analysis_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/profile-analysis.component */ 3555);
/* harmony import */ var _components_story_generation_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/story-generation.component */ 1787);
/* harmony import */ var _components_quiz_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/quiz.component */ 4148);
/* harmony import */ var _components_rewards_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/rewards.component */ 4906);
/* harmony import */ var _services_user_profile_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/user-profile.service */ 9618);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 2560);











class AppModule {
  static ɵfac = function AppModule_Factory(t) {
    return new (t || AppModule)();
  };
  static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({
    type: AppModule,
    bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent]
  });
  static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({
    providers: [_services_user_profile_service__WEBPACK_IMPORTED_MODULE_6__.UserProfileService],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__.BrowserModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClientModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, _components_home_component__WEBPACK_IMPORTED_MODULE_1__.HomeComponent, _components_profile_analysis_component__WEBPACK_IMPORTED_MODULE_2__.ProfileAnalysisComponent, _components_story_generation_component__WEBPACK_IMPORTED_MODULE_3__.StoryGenerationComponent, _components_quiz_component__WEBPACK_IMPORTED_MODULE_4__.QuizComponent, _components_rewards_component__WEBPACK_IMPORTED_MODULE_5__.RewardsComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__.BrowserModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClientModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule]
  });
})();

/***/ }),

/***/ 327:
/*!**********************************************!*\
  !*** ./src/app/components/home.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomeComponent": () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _services_user_profile_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/user-profile.service */ 9618);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4666);



function HomeComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 22)(1, "p")(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Debug Info:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("isLoadingProfile: ", ctx_r0.isLoadingProfile, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("profile exists: ", !!ctx_r0.profile, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("profile name: ", ctx_r0.profile == null ? null : ctx_r0.profile.name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("error: ", ctx_r0.error, "");
  }
}
function HomeComponent_div_15_div_10_div_1_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const hobby_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](hobby_r12);
  }
}
function HomeComponent_div_15_div_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 32)(1, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "\uD83C\uDFAF");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 34)(4, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Hobbies");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, HomeComponent_div_15_div_10_div_1_span_7_Template, 2, 1, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r7.profile.personalization.hobbies);
  }
}
function HomeComponent_div_15_div_10_div_2_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const subject_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](subject_r14);
  }
}
function HomeComponent_div_15_div_10_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 32)(1, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "\uD83D\uDCDA");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 34)(4, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Favorite Subjects");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, HomeComponent_div_15_div_10_div_2_span_7_Template, 2, 1, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r8.profile.personalization.favoriteSubjects);
  }
}
function HomeComponent_div_15_div_10_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 32)(1, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "\uD83C\uDFA8");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 34)(4, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Learning Style");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r9.profile.personalization.preferredLearningStyle);
  }
}
function HomeComponent_div_15_div_10_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 32)(1, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "\uD83D\uDCB0");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 34)(4, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Pocket Money");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("\u20B9", ctx_r10.profile.personalization.pocketMoney.amount, " ", ctx_r10.profile.personalization.pocketMoney.frequency, "");
  }
}
function HomeComponent_div_15_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, HomeComponent_div_15_div_10_div_1_Template, 8, 1, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, HomeComponent_div_15_div_10_div_2_Template, 8, 1, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, HomeComponent_div_15_div_10_div_3_Template, 8, 1, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, HomeComponent_div_15_div_10_div_4_Template, 8, 2, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r6.profile.personalization.hobbies && ctx_r6.profile.personalization.hobbies.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r6.profile.personalization.favoriteSubjects && ctx_r6.profile.personalization.favoriteSubjects.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r6.profile.personalization.preferredLearningStyle);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r6.profile.personalization.pocketMoney);
  }
}
function HomeComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 23)(1, "div", 24)(2, "div", 25)(3, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 27)(6, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "p", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, HomeComponent_div_15_div_10_Template, 5, 4, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", (ctx_r1.profile.name == null ? null : ctx_r1.profile.name.charAt(0)) || "?", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.profile.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate3"]("Age: ", ctx_r1.profile.age, " | Grade: ", ctx_r1.profile.grade, " | ", ctx_r1.profile.country, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.profile.personalization);
  }
}
function HomeComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Loading your profile...");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "If this takes too long, check the browser console (F12)");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function HomeComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 43)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HomeComponent_div_17_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r15.loadProfile());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Retry");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\u274C ", ctx_r3.error, "");
  }
}
function HomeComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 45)(1, "div", 46)(2, "div", 47)(3, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "\u2B50");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 49)(6, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Points");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "span", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 47)(11, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "\uD83C\uDFC6");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 49)(14, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Level");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "span", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "div", 47)(19, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, "\uD83C\uDF96\uFE0F");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "div", 49)(22, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "Badges");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "span", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r4.rewards.points);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r4.rewards.level);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"]((ctx_r4.rewards.badges == null ? null : ctx_r4.rewards.badges.length) || 0);
  }
}
function HomeComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 43)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HomeComponent_div_25_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r18);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r17.onStartStory());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Retry");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\u274C ", ctx_r5.error, "");
  }
}
class HomeComponent {
  userProfileService;
  cdr;
  childId = 'kid_001';
  isLoading = false;
  isLoadingProfile = false;
  error = null;
  rewards = null;
  profile = null;
  reasoning = null;
  constructor(userProfileService, cdr) {
    this.userProfileService = userProfileService;
    this.cdr = cdr;
  }
  ngOnInit() {
    this.loadRewards();
    this.loadProfile();
  }
  loadRewards() {
    this.userProfileService.getRewards(this.childId).subscribe({
      next: response => {
        if (response.success) {
          this.rewards = response;
        }
      },
      error: error => {
        console.error('Failed to load rewards:', error);
      }
    });
  }
  loadProfile() {
    this.isLoadingProfile = true;
    this.error = null;
    this.profile = null;
    console.log('Loading profile for:', this.childId);
    console.log('API URL:', 'http://localhost:8000/api/profile/analyze');
    // First check if backend is reachable
    fetch('http://localhost:8000/').then(() => {
      console.log('Backend is reachable');
    }).catch(() => {
      console.error('Backend is NOT reachable!');
      this.error = 'Backend API is not running. Please start it with: cd backend && ./start_api.sh';
      this.isLoadingProfile = false;
      this.cdr.detectChanges();
      return;
    });
    // Add timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (this.isLoadingProfile) {
        console.error('Profile loading timeout!');
        this.error = 'Profile loading timed out. Make sure backend is running on http://localhost:8000';
        this.isLoadingProfile = false;
        this.cdr.detectChanges();
      }
    }, 15000); // 15 second timeout
    this.userProfileService.analyzeProfile(this.childId).subscribe({
      next: response => {
        clearTimeout(timeout);
        console.log('Profile response received:', response);
        console.log('Response type:', typeof response);
        console.log('Response keys:', Object.keys(response || {}));
        try {
          if (response) {
            if (response.success === true && response.profile) {
              this.profile = response.profile;
              this.reasoning = response.reasoning;
              // Store in service for other components
              this.userProfileService.currentProfile = response.profile;
              console.log('Profile loaded successfully:', this.profile);
              console.log('Profile name:', this.profile?.name);
              this.isLoadingProfile = false;
              this.cdr.detectChanges();
              return;
            } else if (response.profile) {
              // Sometimes API might return profile directly
              this.profile = response.profile;
              this.reasoning = response.reasoning;
              this.userProfileService.currentProfile = response.profile;
              console.log('Profile loaded (direct):', this.profile);
              this.isLoadingProfile = false;
              this.cdr.detectChanges();
              return;
            }
          }
          console.error('Invalid profile response structure:', response);
          this.error = 'Failed to load profile: Invalid response structure';
          this.isLoadingProfile = false;
          this.cdr.detectChanges();
        } catch (e) {
          console.error('Error processing profile response:', e);
          this.error = 'Error processing profile data';
          this.isLoadingProfile = false;
          this.cdr.detectChanges();
        }
      },
      error: error => {
        clearTimeout(timeout);
        console.error('Profile loading error:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error details:', error.error);
        if (error.status === 0) {
          this.error = 'Cannot connect to backend API. Make sure it\'s running on http://localhost:8000';
        } else if (error.status === 404) {
          this.error = 'API endpoint not found. Check backend is running.';
        } else if (error.status === 500) {
          this.error = 'Server error: ' + (error.error?.detail || error.message);
        } else {
          this.error = error.error?.detail || error.message || 'Failed to load profile';
        }
        this.isLoadingProfile = false;
        this.cdr.detectChanges();
      },
      complete: () => {
        clearTimeout(timeout);
        console.log('Profile loading observable completed');
        if (this.isLoadingProfile && !this.profile) {
          console.warn('Observable completed but no profile loaded!');
          this.isLoadingProfile = false;
          this.cdr.detectChanges();
        }
      }
    });
  }
  onStartStory() {
    // Navigate to profile analysis first, then story
    this.isLoading = true;
    this.error = null;
    console.log('Starting learning journey for:', this.childId);
    this.userProfileService.startLearningJourney(this.childId).subscribe({
      next: response => {
        console.log('Learning journey response:', response);
        if (response.success && !response.completed) {
          // Store profile and story in service
          if (response.profile) {
            this.userProfileService.currentProfile = response.profile;
            console.log('Profile stored:', response.profile);
          }
          if (response.story) {
            this.userProfileService.currentStory = response.story;
            console.log('Story stored:', response.story);
            console.log('Story title:', response.story.title);
            console.log('Story panels:', response.story.panels?.length);
          } else {
            console.error('No story in response!');
            this.error = 'Story not found in response';
            this.isLoading = false;
            return;
          }
          // Navigate to story screen
          const navigateFn = this.userProfileService.navigateToStory;
          if (navigateFn) {
            console.log('Navigating to story screen...');
            setTimeout(() => {
              navigateFn();
            }, 100); // Small delay to ensure data is stored
          } else {
            console.error('Navigation function not found!');
            this.error = 'Navigation not available. Please refresh the page.';
          }
        } else if (response.completed) {
          this.error = response.message || 'All topics completed!';
        } else {
          this.error = 'Invalid response from server';
        }
        this.isLoading = false;
      },
      error: error => {
        console.error('Start journey error:', error);
        this.error = error.error?.detail || error.message || 'Failed to start learning journey. Make sure the backend API is running on http://localhost:8000';
        this.isLoading = false;
      }
    });
  }
  onViewRewards() {
    // Navigate to rewards screen
    if (this.userProfileService) {
      this.userProfileService.navigateToRewards?.();
    }
  }
  static ɵfac = function HomeComponent_Factory(t) {
    return new (t || HomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_user_profile_service__WEBPACK_IMPORTED_MODULE_0__.UserProfileService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: HomeComponent,
    selectors: [["app-home"]],
    decls: 34,
    vars: 8,
    consts: [[1, "home-container"], [1, "header-section"], [1, "panda-avatar"], [1, "panda-face"], [1, "panda-ear", "left"], [1, "panda-ear", "right"], [1, "panda-eye", "left"], [1, "panda-eye", "right"], [1, "panda-nose"], [1, "panda-mouth"], [1, "subtitle"], ["style", "background: yellow; padding: 10px; margin: 10px; border-radius: 5px;", 4, "ngIf"], ["class", "profile-section", 4, "ngIf"], ["class", "loading-profile", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], ["class", "rewards-preview", 4, "ngIf"], [1, "actions-section"], [1, "action-btn", "primary", 3, "disabled", "click"], [1, "btn-icon"], [1, "btn-text"], [1, "action-btn", "tertiary", 3, "click"], [1, "welcome-message"], [2, "background", "yellow", "padding", "10px", "margin", "10px", "border-radius", "5px"], [1, "profile-section"], [1, "profile-card"], [1, "profile-header"], [1, "profile-avatar-small"], [1, "profile-info"], [1, "profile-details"], ["class", "profile-insights", 4, "ngIf"], [1, "profile-insights"], ["class", "insight-item", 4, "ngIf"], [1, "insight-item"], [1, "insight-icon"], [1, "insight-content"], [1, "insight-label"], [1, "insight-tags"], ["class", "tag", 4, "ngFor", "ngForOf"], [1, "tag"], [1, "insight-value"], [1, "loading-profile"], [1, "spinner-small"], [2, "font-size", "12px", "margin-top", "10px"], [1, "error-message"], [1, "btn-retry-small", 3, "click"], [1, "rewards-preview"], [1, "reward-card"], [1, "reward-item"], [1, "reward-icon"], [1, "reward-info"], [1, "reward-label"], [1, "reward-value"]],
    template: function HomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "div", 4)(5, "div", 5)(6, "div", 6)(7, "div", 7)(8, "div", 8)(9, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Hi! I'm Buddy the Panda \uD83D\uDC3C");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "p", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Your Financial Education Friend");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, HomeComponent_div_14_Template, 12, 4, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, HomeComponent_div_15_Template, 11, 6, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](16, HomeComponent_div_16_Template, 6, 0, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, HomeComponent_div_17_Template, 5, 1, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](18, HomeComponent_div_18_Template, 26, 3, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 16)(20, "button", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HomeComponent_Template_button_click_20_listener() {
          return ctx.onStartStory();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "span", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "\uD83D\uDCD6");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "span", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](25, HomeComponent_div_25_Template, 5, 1, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HomeComponent_Template_button_click_26_listener() {
          return ctx.onViewRewards();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "span", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](28, "\uD83C\uDFC5");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "span", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, "My Rewards");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "div", 21)(32, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](33, "Let's learn about money together! Choose an activity to begin your financial education journey.");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.profile && ctx.profile.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoadingProfile);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.error && !ctx.isLoadingProfile);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.rewards);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.isLoading ? "Loading..." : "Start Story");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.error);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf],
    styles: [".home-container[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 40px 20px;\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n  text-align: center;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.header-section[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.panda-avatar[_ngcontent-%COMP%] {\n  margin-bottom: 30px;\n}\n\n.panda-face[_ngcontent-%COMP%] {\n  width: 200px;\n  height: 200px;\n  margin: 0 auto 30px;\n  position: relative;\n  background: white;\n  border-radius: 50%;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);\n}\n\n.panda-ear[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 60px;\n  height: 60px;\n  background: black;\n  border-radius: 50%;\n  top: -20px;\n}\n\n.panda-ear.left[_ngcontent-%COMP%] {\n  left: 20px;\n}\n\n.panda-ear.right[_ngcontent-%COMP%] {\n  right: 20px;\n}\n\n.panda-eye[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 30px;\n  height: 40px;\n  background: black;\n  border-radius: 50%;\n  top: 60px;\n  animation: _ngcontent-%COMP%_blink 3s infinite;\n}\n\n.panda-eye.left[_ngcontent-%COMP%] {\n  left: 50px;\n}\n\n.panda-eye.right[_ngcontent-%COMP%] {\n  right: 50px;\n}\n\n@keyframes _ngcontent-%COMP%_blink {\n  0%, 90%, 100% { height: 40px; }\n  95% { height: 5px; }\n}\n\n.panda-nose[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 25px;\n  height: 20px;\n  background: black;\n  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;\n  top: 100px;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.panda-mouth[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 60px;\n  height: 30px;\n  border: 3px solid black;\n  border-top: none;\n  border-radius: 0 0 60px 60px;\n  top: 120px;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.panda-avatar[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 2.5em;\n  margin: 20px 0 10px;\n  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);\n}\n\n.subtitle[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.9);\n  font-size: 1.2em;\n  margin: 0;\n}\n\n.rewards-preview[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n\n.reward-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 20px;\n  padding: 25px;\n  display: flex;\n  justify-content: space-around;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);\n  max-width: 600px;\n  margin: 0 auto;\n}\n\n.reward-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n}\n\n.reward-icon[_ngcontent-%COMP%] {\n  font-size: 2.5em;\n}\n\n.reward-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.reward-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #666;\n  font-weight: 500;\n}\n\n.reward-value[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: bold;\n  color: #333;\n}\n\n.actions-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  max-width: 400px;\n  margin: 0 auto 30px;\n}\n\n.action-btn[_ngcontent-%COMP%] {\n  padding: 20px 30px;\n  border: none;\n  border-radius: 15px;\n  font-size: 18px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 15px;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);\n}\n\n.action-btn.primary[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);\n  color: white;\n}\n\n.action-btn.primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 6px 20px rgba(245, 87, 108, 0.4);\n}\n\n.action-btn.secondary[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);\n  color: white;\n}\n\n.action-btn.secondary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4);\n}\n\n.action-btn.tertiary[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);\n  color: white;\n}\n\n.action-btn.tertiary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 6px 20px rgba(250, 112, 154, 0.4);\n}\n\n.btn-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n\n.btn-text[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n\n.welcome-message[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  backdrop-filter: blur(10px);\n  border-radius: 15px;\n  padding: 20px;\n  color: white;\n  font-size: 16px;\n  line-height: 1.6;\n  max-width: 500px;\n  margin: 0 auto;\n}\n\n\n.profile-section[_ngcontent-%COMP%] {\n  margin-bottom: 30px;\n  max-width: 800px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.profile-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 20px;\n  padding: 30px;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);\n}\n\n.profile-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  margin-bottom: 25px;\n  padding-bottom: 20px;\n  border-bottom: 2px solid #e9ecef;\n}\n\n.profile-avatar-small[_ngcontent-%COMP%] {\n  width: 70px;\n  height: 70px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 32px;\n  font-weight: bold;\n  flex-shrink: 0;\n}\n\n.profile-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 5px 0;\n  color: #333;\n  font-size: 1.8em;\n}\n\n.profile-details[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #666;\n  font-size: 14px;\n}\n\n.profile-insights[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n}\n\n.insight-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 15px;\n  align-items: flex-start;\n  padding: 15px;\n  background: #f8f9fa;\n  border-radius: 12px;\n  border-left: 4px solid #667eea;\n}\n\n.insight-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  flex-shrink: 0;\n}\n\n.insight-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.insight-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #666;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.insight-tags[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n\n.insight-tags[_ngcontent-%COMP%]   .tag[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border-radius: 15px;\n  font-size: 13px;\n  font-weight: 500;\n}\n\n.insight-value[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: #333;\n}\n\n.loading-profile[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 30px;\n  background: rgba(255, 255, 255, 0.2);\n  backdrop-filter: blur(10px);\n  border-radius: 15px;\n  color: white;\n  margin-bottom: 30px;\n}\n\n.spinner-small[_ngcontent-%COMP%] {\n  border: 3px solid rgba(255, 255, 255, 0.3);\n  border-top: 3px solid white;\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  animation: spin 1s linear infinite;\n  margin: 0 auto 15px;\n}\n\n.error-message[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.95);\n  border-radius: 12px;\n  padding: 20px;\n  margin-top: 20px;\n  color: #c33;\n  text-align: center;\n  max-width: 500px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.error-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 15px 0;\n  font-weight: 500;\n}\n\n.btn-retry-small[_ngcontent-%COMP%] {\n  padding: 8px 20px;\n  background: #c33;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n\n.btn-retry-small[_ngcontent-%COMP%]:hover {\n  background: #a22;\n  transform: translateY(-2px);\n}\n\n.action-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n@media (max-width: 768px) {\n  .home-container[_ngcontent-%COMP%] {\n    padding: 20px 10px;\n  }\n  \n  .panda-face[_ngcontent-%COMP%] {\n    width: 150px;\n    height: 150px;\n  }\n  \n  .panda-avatar[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.8em;\n  }\n  \n  .reward-card[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 20px;\n  }\n  \n  .actions-section[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9ob21lLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLGtCQUFrQjtFQUNsQiw0REFBNEQ7RUFDNUQsa0JBQWtCO0VBQ2xCLDZEQUE2RDtFQUM3RCxpQkFBaUI7RUFDakIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQiwwQ0FBMEM7QUFDNUM7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsU0FBUztFQUNULDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGdCQUFnQixZQUFZLEVBQUU7RUFDOUIsTUFBTSxXQUFXLEVBQUU7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsZ0RBQWdEO0VBQ2hELFVBQVU7RUFDVixTQUFTO0VBQ1QsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxZQUFZO0VBQ1osdUJBQXVCO0VBQ3ZCLGdCQUFnQjtFQUNoQiw0QkFBNEI7RUFDNUIsVUFBVTtFQUNWLFNBQVM7RUFDVCwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQiwyQ0FBMkM7QUFDN0M7O0FBRUE7RUFDRSwrQkFBK0I7RUFDL0IsZ0JBQWdCO0VBQ2hCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLGFBQWE7RUFDYiw2QkFBNkI7RUFDN0IseUNBQXlDO0VBQ3pDLGdCQUFnQjtFQUNoQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsU0FBUztBQUNYOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsV0FBVztFQUNYLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixTQUFTO0VBQ1QsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLG9CQUFvQjtFQUNwQixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixTQUFTO0VBQ1QseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UsNkRBQTZEO0VBQzdELFlBQVk7QUFDZDs7QUFFQTtFQUNFLDJCQUEyQjtFQUMzQiw4Q0FBOEM7QUFDaEQ7O0FBRUE7RUFDRSw2REFBNkQ7RUFDN0QsWUFBWTtBQUNkOztBQUVBO0VBQ0UsMkJBQTJCO0VBQzNCLDhDQUE4QztBQUNoRDs7QUFFQTtFQUNFLDZEQUE2RDtFQUM3RCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0IsK0NBQStDO0FBQ2pEOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxvQ0FBb0M7RUFDcEMsMkJBQTJCO0VBQzNCLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2IsWUFBWTtFQUNaLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLGNBQWM7QUFDaEI7O0FBRUEsb0JBQW9CO0FBQ3BCO0VBQ0UsbUJBQW1CO0VBQ25CLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2IseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixTQUFTO0VBQ1QsbUJBQW1CO0VBQ25CLG9CQUFvQjtFQUNwQixnQ0FBZ0M7QUFDbEM7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQiw2REFBNkQ7RUFDN0QsWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixXQUFXO0VBQ1gsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsU0FBUztFQUNULFdBQVc7RUFDWCxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDJEQUEyRDtFQUMzRCxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsU0FBUztFQUNULHVCQUF1QjtFQUN2QixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQiw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsY0FBYztBQUNoQjs7QUFFQTtFQUNFLE9BQU87RUFDUCxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFFBQVE7QUFDVjs7QUFFQTtFQUNFLGVBQWU7RUFDZixXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLHlCQUF5QjtFQUN6QixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZUFBZTtFQUNmLFFBQVE7QUFDVjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQiw2REFBNkQ7RUFDN0QsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2YsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLG9DQUFvQztFQUNwQywyQkFBMkI7RUFDM0IsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSwwQ0FBMEM7RUFDMUMsMkJBQTJCO0VBQzNCLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsWUFBWTtFQUNaLGtDQUFrQztFQUNsQyxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxxQ0FBcUM7RUFDckMsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2Ysb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRTtJQUNFLGtCQUFrQjtFQUNwQjs7RUFFQTtJQUNFLFlBQVk7SUFDWixhQUFhO0VBQ2Y7O0VBRUE7SUFDRSxnQkFBZ0I7RUFDbEI7O0VBRUE7SUFDRSxzQkFBc0I7SUFDdEIsU0FBUztFQUNYOztFQUVBO0lBQ0UsZUFBZTtFQUNqQjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmhvbWUtY29udGFpbmVyIHtcbiAgbWF4LXdpZHRoOiA4MDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIHBhZGRpbmc6IDQwcHggMjBweDtcbiAgZm9udC1mYW1pbHk6ICdTZWdvZSBVSScsIFRhaG9tYSwgR2VuZXZhLCBWZXJkYW5hLCBzYW5zLXNlcmlmO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM2NjdlZWEgMCUsICM3NjRiYTIgMTAwJSk7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLmhlYWRlci1zZWN0aW9uIHtcbiAgbWFyZ2luLWJvdHRvbTogNDBweDtcbn1cblxuLnBhbmRhLWF2YXRhciB7XG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XG59XG5cbi5wYW5kYS1mYWNlIHtcbiAgd2lkdGg6IDIwMHB4O1xuICBoZWlnaHQ6IDIwMHB4O1xuICBtYXJnaW46IDAgYXV0byAzMHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJveC1zaGFkb3c6IDAgMTBweCAzMHB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcbn1cblxuLnBhbmRhLWVhciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDYwcHg7XG4gIGhlaWdodDogNjBweDtcbiAgYmFja2dyb3VuZDogYmxhY2s7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgdG9wOiAtMjBweDtcbn1cblxuLnBhbmRhLWVhci5sZWZ0IHtcbiAgbGVmdDogMjBweDtcbn1cblxuLnBhbmRhLWVhci5yaWdodCB7XG4gIHJpZ2h0OiAyMHB4O1xufVxuXG4ucGFuZGEtZXllIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMzBweDtcbiAgaGVpZ2h0OiA0MHB4O1xuICBiYWNrZ3JvdW5kOiBibGFjaztcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICB0b3A6IDYwcHg7XG4gIGFuaW1hdGlvbjogYmxpbmsgM3MgaW5maW5pdGU7XG59XG5cbi5wYW5kYS1leWUubGVmdCB7XG4gIGxlZnQ6IDUwcHg7XG59XG5cbi5wYW5kYS1leWUucmlnaHQge1xuICByaWdodDogNTBweDtcbn1cblxuQGtleWZyYW1lcyBibGluayB7XG4gIDAlLCA5MCUsIDEwMCUgeyBoZWlnaHQ6IDQwcHg7IH1cbiAgOTUlIHsgaGVpZ2h0OiA1cHg7IH1cbn1cblxuLnBhbmRhLW5vc2Uge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAyNXB4O1xuICBoZWlnaHQ6IDIwcHg7XG4gIGJhY2tncm91bmQ6IGJsYWNrO1xuICBib3JkZXItcmFkaXVzOiA1MCUgNTAlIDUwJSA1MCUgLyA2MCUgNjAlIDQwJSA0MCU7XG4gIHRvcDogMTAwcHg7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xufVxuXG4ucGFuZGEtbW91dGgge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiA2MHB4O1xuICBoZWlnaHQ6IDMwcHg7XG4gIGJvcmRlcjogM3B4IHNvbGlkIGJsYWNrO1xuICBib3JkZXItdG9wOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAwIDAgNjBweCA2MHB4O1xuICB0b3A6IDEyMHB4O1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbn1cblxuLnBhbmRhLWF2YXRhciBoMSB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiAyLjVlbTtcbiAgbWFyZ2luOiAyMHB4IDAgMTBweDtcbiAgdGV4dC1zaGFkb3c6IDJweCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcbn1cblxuLnN1YnRpdGxlIHtcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTtcbiAgZm9udC1zaXplOiAxLjJlbTtcbiAgbWFyZ2luOiAwO1xufVxuXG4ucmV3YXJkcy1wcmV2aWV3IHtcbiAgbWFyZ2luLWJvdHRvbTogNDBweDtcbn1cblxuLnJld2FyZC1jYXJkIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIHBhZGRpbmc6IDI1cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICBib3gtc2hhZG93OiAwIDhweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgbWF4LXdpZHRoOiA2MDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi5yZXdhcmQtaXRlbSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbn1cblxuLnJld2FyZC1pY29uIHtcbiAgZm9udC1zaXplOiAyLjVlbTtcbn1cblxuLnJld2FyZC1pbmZvIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnJld2FyZC1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6ICM2NjY7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi5yZXdhcmQtdmFsdWUge1xuICBmb250LXNpemU6IDI0cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogIzMzMztcbn1cblxuLmFjdGlvbnMtc2VjdGlvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMjBweDtcbiAgbWF4LXdpZHRoOiA0MDBweDtcbiAgbWFyZ2luOiAwIGF1dG8gMzBweDtcbn1cblxuLmFjdGlvbi1idG4ge1xuICBwYWRkaW5nOiAyMHB4IDMwcHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiAxNXB4O1xuICBib3gtc2hhZG93OiAwIDRweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbn1cblxuLmFjdGlvbi1idG4ucHJpbWFyeSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmMDkzZmIgMCUsICNmNTU3NmMgMTAwJSk7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmFjdGlvbi1idG4ucHJpbWFyeTpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtM3B4KTtcbiAgYm94LXNoYWRvdzogMCA2cHggMjBweCByZ2JhKDI0NSwgODcsIDEwOCwgMC40KTtcbn1cblxuLmFjdGlvbi1idG4uc2Vjb25kYXJ5IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzRmYWNmZSAwJSwgIzAwZjJmZSAxMDAlKTtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uYWN0aW9uLWJ0bi5zZWNvbmRhcnk6aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCk7XG4gIGJveC1zaGFkb3c6IDAgNnB4IDIwcHggcmdiYSg3OSwgMTcyLCAyNTQsIDAuNCk7XG59XG5cbi5hY3Rpb24tYnRuLnRlcnRpYXJ5IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZhNzA5YSAwJSwgI2ZlZTE0MCAxMDAlKTtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uYWN0aW9uLWJ0bi50ZXJ0aWFyeTpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtM3B4KTtcbiAgYm94LXNoYWRvdzogMCA2cHggMjBweCByZ2JhKDI1MCwgMTEyLCAxNTQsIDAuNCk7XG59XG5cbi5idG4taWNvbiB7XG4gIGZvbnQtc2l6ZTogMjRweDtcbn1cblxuLmJ0bi10ZXh0IHtcbiAgZm9udC1zaXplOiAxOHB4O1xufVxuXG4ud2VsY29tZS1tZXNzYWdlIHtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMTBweCk7XG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gIHBhZGRpbmc6IDIwcHg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBsaW5lLWhlaWdodDogMS42O1xuICBtYXgtd2lkdGg6IDUwMHB4O1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuLyogUHJvZmlsZSBTZWN0aW9uICovXG4ucHJvZmlsZS1zZWN0aW9uIHtcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcbiAgbWF4LXdpZHRoOiA4MDBweDtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1hcmdpbi1yaWdodDogYXV0bztcbn1cblxuLnByb2ZpbGUtY2FyZCB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICBwYWRkaW5nOiAzMHB4O1xuICBib3gtc2hhZG93OiAwIDhweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbn1cblxuLnByb2ZpbGUtaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAyMHB4O1xuICBtYXJnaW4tYm90dG9tOiAyNXB4O1xuICBwYWRkaW5nLWJvdHRvbTogMjBweDtcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNlOWVjZWY7XG59XG5cbi5wcm9maWxlLWF2YXRhci1zbWFsbCB7XG4gIHdpZHRoOiA3MHB4O1xuICBoZWlnaHQ6IDcwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2N2VlYSAwJSwgIzc2NGJhMiAxMDAlKTtcbiAgY29sb3I6IHdoaXRlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAzMnB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZmxleC1zaHJpbms6IDA7XG59XG5cbi5wcm9maWxlLWluZm8gaDIge1xuICBtYXJnaW46IDAgMCA1cHggMDtcbiAgY29sb3I6ICMzMzM7XG4gIGZvbnQtc2l6ZTogMS44ZW07XG59XG5cbi5wcm9maWxlLWRldGFpbHMge1xuICBtYXJnaW46IDA7XG4gIGNvbG9yOiAjNjY2O1xuICBmb250LXNpemU6IDE0cHg7XG59XG5cbi5wcm9maWxlLWluc2lnaHRzIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyNTBweCwgMWZyKSk7XG4gIGdhcDogMjBweDtcbn1cblxuLmluc2lnaHQtaXRlbSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMTVweDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIHBhZGRpbmc6IDE1cHg7XG4gIGJhY2tncm91bmQ6ICNmOGY5ZmE7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGJvcmRlci1sZWZ0OiA0cHggc29saWQgIzY2N2VlYTtcbn1cblxuLmluc2lnaHQtaWNvbiB7XG4gIGZvbnQtc2l6ZTogMjhweDtcbiAgZmxleC1zaHJpbms6IDA7XG59XG5cbi5pbnNpZ2h0LWNvbnRlbnQge1xuICBmbGV4OiAxO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDhweDtcbn1cblxuLmluc2lnaHQtbGFiZWwge1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiAjNjY2O1xuICBmb250LXdlaWdodDogNjAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBsZXR0ZXItc3BhY2luZzogMC41cHg7XG59XG5cbi5pbnNpZ2h0LXRhZ3Mge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogOHB4O1xufVxuXG4uaW5zaWdodC10YWdzIC50YWcge1xuICBwYWRkaW5nOiA2cHggMTJweDtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2N2VlYSAwJSwgIzc2NGJhMiAxMDAlKTtcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi5pbnNpZ2h0LXZhbHVlIHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzMzMztcbn1cblxuLmxvYWRpbmctcHJvZmlsZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZzogMzBweDtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMTBweCk7XG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcbn1cblxuLnNwaW5uZXItc21hbGwge1xuICBib3JkZXI6IDNweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMyk7XG4gIGJvcmRlci10b3A6IDNweCBzb2xpZCB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICB3aWR0aDogNDBweDtcbiAgaGVpZ2h0OiA0MHB4O1xuICBhbmltYXRpb246IHNwaW4gMXMgbGluZWFyIGluZmluaXRlO1xuICBtYXJnaW46IDAgYXV0byAxNXB4O1xufVxuXG4uZXJyb3ItbWVzc2FnZSB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45NSk7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHBhZGRpbmc6IDIwcHg7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG4gIGNvbG9yOiAjYzMzO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1heC13aWR0aDogNTAwcHg7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IGF1dG87XG59XG5cbi5lcnJvci1tZXNzYWdlIHAge1xuICBtYXJnaW46IDAgMCAxNXB4IDA7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi5idG4tcmV0cnktc21hbGwge1xuICBwYWRkaW5nOiA4cHggMjBweDtcbiAgYmFja2dyb3VuZDogI2MzMztcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcztcbn1cblxuLmJ0bi1yZXRyeS1zbWFsbDpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNhMjI7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbn1cblxuLmFjdGlvbi1idG46ZGlzYWJsZWQge1xuICBvcGFjaXR5OiAwLjY7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAuaG9tZS1jb250YWluZXIge1xuICAgIHBhZGRpbmc6IDIwcHggMTBweDtcbiAgfVxuICBcbiAgLnBhbmRhLWZhY2Uge1xuICAgIHdpZHRoOiAxNTBweDtcbiAgICBoZWlnaHQ6IDE1MHB4O1xuICB9XG4gIFxuICAucGFuZGEtYXZhdGFyIGgxIHtcbiAgICBmb250LXNpemU6IDEuOGVtO1xuICB9XG4gIFxuICAucmV3YXJkLWNhcmQge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ2FwOiAyMHB4O1xuICB9XG4gIFxuICAuYWN0aW9ucy1zZWN0aW9uIHtcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG4gIH1cbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 3555:
/*!**********************************************************!*\
  !*** ./src/app/components/profile-analysis.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileAnalysisComponent": () => (/* binding */ ProfileAnalysisComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _services_user_profile_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/user-profile.service */ 9618);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 2508);





function ProfileAnalysisComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 8)(1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Analyzing Profile...");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "We're analyzing transaction data and generating personalized insights");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
}
function ProfileAnalysisComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 11)(1, "div", 12)(2, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "\u274C");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Analysis Failed");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ProfileAnalysisComponent_div_11_Template_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r3.analyzeProfile());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Retry Analysis");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.error);
  }
}
function ProfileAnalysisComponent_div_12_span_83_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const hobby_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", hobby_r7, " ");
  }
}
function ProfileAnalysisComponent_div_12_span_88_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const subject_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", subject_r8, " ");
  }
}
function ProfileAnalysisComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 15)(1, "div", 16)(2, "div", 17)(3, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "\uD83D\uDC64 Child Profile");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 18)(6, "div", 19)(7, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 21)(10, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 22)(13, "div", 23)(14, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Age:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "div", 23)(19, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, "Grade:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "div", 23)(24, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25, "Country:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "div", 23)(29, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, "Child ID:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "div", 26)(34, "div", 17)(35, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](36, "\uD83E\uDDE0 Analysis Reasoning");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "p", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](38, "How we determined the personalization insights");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "div", 28)(40, "div", 29)(41, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](42, "\uD83C\uDFAF");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](43, "div", 31)(44, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](45, "Hobbies Identified");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](46, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](48, "div", 29)(49, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](50, "\uD83D\uDCDA");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](51, "div", 31)(52, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](53, "Favorite Subjects");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](54, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](55);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](56, "div", 29)(57, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](58, "\uD83C\uDFA8");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](59, "div", 31)(60, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](61, "Learning Style");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](62, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](63);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](64, "div", 29)(65, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](66, "\uD83D\uDCB0");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](67, "div", 31)(68, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](69, "Pocket Money Pattern");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](70, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](71);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](72, "div", 32)(73, "div", 17)(74, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](75, "\u2728 Personalization Insights");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](76, "p", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](77, "Customized learning recommendations");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](78, "div", 33)(79, "div", 34)(80, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](81, "\uD83C\uDFAF Hobbies");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](82, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](83, ProfileAnalysisComponent_div_12_span_83_Template, 2, 1, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](84, "div", 34)(85, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](86, "\uD83D\uDCDA Favorite Subjects");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](87, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](88, ProfileAnalysisComponent_div_12_span_88_Template, 2, 1, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](89, "div", 34)(90, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](91, "\uD83C\uDFA8 Preferred Learning Style");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](92, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](93);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](94, "div", 34)(95, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](96, "\uD83D\uDCB0 Pocket Money Details");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](97, "div", 39)(98, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](99);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](100, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](101);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](102, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](103);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](104, "div", 43)(105, "button", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ProfileAnalysisComponent_div_12_Template_button_click_105_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r9.onReadStories());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](106, " \uD83D\uDCD6 Read Stories ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.profile.name.charAt(0));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.profile.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx_r2.profile.age, " years");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.profile.grade);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.profile.country);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.profile.childId);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.reasoning.hobbies);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.reasoning.subjects);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.reasoning.learningStyle);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.reasoning.pocketMoney);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r2.profile.personalization.hobbies);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r2.profile.personalization.favoriteSubjects);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r2.profile.personalization.preferredLearningStyle, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" \u20B9", ctx_r2.profile.personalization.pocketMoney.amount, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r2.profile.personalization.pocketMoney.frequency, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r2.profile.personalization.pocketMoney.currency, " ");
  }
}
class ProfileAnalysisComponent {
  userProfileService;
  readStories = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
  childId = 'kid_001';
  profile = null;
  reasoning = null;
  isLoading = false;
  error = null;
  showResults = false;
  constructor(userProfileService) {
    this.userProfileService = userProfileService;
  }
  ngOnInit() {
    // Auto-analyze on component load
    this.analyzeProfile();
  }
  analyzeProfile() {
    this.isLoading = true;
    this.error = null;
    this.showResults = false;
    this.profile = null;
    this.reasoning = null;
    this.userProfileService.analyzeProfile(this.childId).subscribe({
      next: response => {
        this.profile = response.profile;
        this.reasoning = response.reasoning;
        this.isLoading = false;
        this.showResults = true;
      },
      error: error => {
        this.error = error.error?.detail || 'Failed to analyze profile';
        this.isLoading = false;
        console.error('Profile analysis error:', error);
      }
    });
  }
  onReadStories() {
    if (this.profile) {
      // Store profile in service for story component to use
      this.userProfileService.currentProfile = this.profile;
      this.readStories.emit();
    }
  }
  static ɵfac = function ProfileAnalysisComponent_Factory(t) {
    return new (t || ProfileAnalysisComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_user_profile_service__WEBPACK_IMPORTED_MODULE_0__.UserProfileService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: ProfileAnalysisComponent,
    selectors: [["app-profile-analysis"]],
    outputs: {
      readStories: "readStories"
    },
    decls: 13,
    vars: 7,
    consts: [[1, "profile-analysis-container"], [1, "header"], [1, "child-selector"], ["type", "text", "placeholder", "kid_001", 3, "ngModel", "disabled", "ngModelChange"], [1, "btn-analyze", 3, "disabled", "click"], ["class", "loading-section", 4, "ngIf"], ["class", "error-section", 4, "ngIf"], ["class", "results-section", 4, "ngIf"], [1, "loading-section"], [1, "loading"], [1, "spinner"], [1, "error-section"], [1, "error-card"], [1, "error-icon"], [1, "btn-retry", 3, "click"], [1, "results-section"], [1, "profile-card"], [1, "card-header"], [1, "profile-content"], [1, "profile-avatar"], [1, "avatar-circle"], [1, "profile-details"], [1, "detail-grid"], [1, "detail-item"], [1, "label"], [1, "value"], [1, "reasoning-card"], [1, "subtitle"], [1, "reasoning-content"], [1, "reasoning-item"], [1, "reasoning-icon"], [1, "reasoning-text"], [1, "personalization-card"], [1, "personalization-content"], [1, "insight-section"], [1, "tags-container"], ["class", "tag hobby-tag", 4, "ngFor", "ngForOf"], ["class", "tag subject-tag", 4, "ngFor", "ngForOf"], [1, "learning-style-badge"], [1, "pocket-money-info"], [1, "money-amount"], [1, "money-frequency"], [1, "money-currency"], [1, "action-section"], [1, "btn-primary", "btn-large", 3, "click"], [1, "tag", "hobby-tag"], [1, "tag", "subject-tag"]],
    template: function ProfileAnalysisComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "\uD83D\uDD0D Profile Analysis");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 2)(5, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Child ID:");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ProfileAnalysisComponent_Template_input_ngModelChange_7_listener($event) {
          return ctx.childId = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ProfileAnalysisComponent_Template_button_click_8_listener() {
          return ctx.analyzeProfile();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, ProfileAnalysisComponent_div_10_Template, 7, 0, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, ProfileAnalysisComponent_div_11_Template, 10, 1, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, ProfileAnalysisComponent_div_12_Template, 107, 16, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.childId)("disabled", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.isLoading ? "Analyzing..." : "Analyze Profile", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.error && !ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showResults && ctx.profile && ctx.reasoning);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgModel],
    styles: [".profile-analysis-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n  background: #f5f7fa;\n  min-height: 100vh;\n}\n\n.header[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  padding: 30px;\n  border-radius: 12px;\n  margin-bottom: 30px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0 0 20px 0;\n  font-size: 2.5em;\n  font-weight: 600;\n}\n\n.child-selector[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  flex-wrap: wrap;\n}\n\n.child-selector[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 16px;\n}\n\n.child-selector[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding: 12px 15px;\n  border: none;\n  border-radius: 8px;\n  font-size: 16px;\n  width: 200px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n.child-selector[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled {\n  background: #e9ecef;\n  cursor: not-allowed;\n}\n\n.btn-analyze[_ngcontent-%COMP%] {\n  padding: 12px 25px;\n  background: white;\n  color: #667eea;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 16px;\n  cursor: pointer;\n  transition: all 0.3s;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n.btn-analyze[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n}\n\n.btn-analyze[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n\n.loading-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 400px;\n}\n\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n}\n\n.spinner[_ngcontent-%COMP%] {\n  border: 5px solid #f3f3f3;\n  border-top: 5px solid #667eea;\n  border-radius: 50%;\n  width: 60px;\n  height: 60px;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto 30px;\n}\n\n@keyframes _ngcontent-%COMP%_spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n.loading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #333;\n  margin-bottom: 10px;\n}\n\n.loading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 16px;\n}\n\n\n.error-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 400px;\n}\n\n.error-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 40px;\n  text-align: center;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  max-width: 500px;\n}\n\n.error-icon[_ngcontent-%COMP%] {\n  font-size: 60px;\n  margin-bottom: 20px;\n}\n\n.error-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #c33;\n  margin-bottom: 15px;\n}\n\n.error-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  margin-bottom: 25px;\n  font-size: 16px;\n}\n\n.btn-retry[_ngcontent-%COMP%] {\n  padding: 12px 30px;\n  background: #c33;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n\n.btn-retry[_ngcontent-%COMP%]:hover {\n  background: #a22;\n  transform: translateY(-2px);\n}\n\n\n.results-section[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.5s ease-in;\n}\n\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.profile-card[_ngcontent-%COMP%], .reasoning-card[_ngcontent-%COMP%], .personalization-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 30px;\n  margin-bottom: 25px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n.card-header[_ngcontent-%COMP%] {\n  margin-bottom: 25px;\n  padding-bottom: 15px;\n  border-bottom: 2px solid #e9ecef;\n}\n\n.card-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #333;\n  margin: 0 0 5px 0;\n  font-size: 1.8em;\n}\n\n.subtitle[_ngcontent-%COMP%] {\n  color: #666;\n  margin: 0;\n  font-size: 14px;\n}\n\n\n.profile-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 30px;\n}\n\n.profile-avatar[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n\n.avatar-circle[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 40px;\n  font-weight: bold;\n  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);\n}\n\n.profile-details[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.profile-details[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #333;\n  font-size: 2em;\n  margin: 0 0 20px 0;\n}\n\n.detail-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 15px;\n}\n\n.detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n\n.label[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 14px;\n  font-weight: 500;\n}\n\n.value[_ngcontent-%COMP%] {\n  color: #333;\n  font-size: 18px;\n  font-weight: 600;\n}\n\n\n.reasoning-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 25px;\n}\n\n.reasoning-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  padding: 20px;\n  background: #f8f9fa;\n  border-radius: 8px;\n  border-left: 4px solid #667eea;\n}\n\n.reasoning-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  flex-shrink: 0;\n}\n\n.reasoning-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.reasoning-text[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  color: #667eea;\n  margin: 0 0 10px 0;\n  font-size: 18px;\n}\n\n.reasoning-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #555;\n  line-height: 1.6;\n  margin: 0;\n  font-size: 15px;\n}\n\n\n.personalization-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 30px;\n}\n\n.insight-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  color: #333;\n  margin: 0 0 15px 0;\n  font-size: 18px;\n}\n\n.tags-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.tag[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border-radius: 25px;\n  font-weight: 500;\n  font-size: 14px;\n}\n\n.hobby-tag[_ngcontent-%COMP%] {\n  background: #e7f3ff;\n  color: #0066cc;\n  border: 2px solid #b3d9ff;\n}\n\n.subject-tag[_ngcontent-%COMP%] {\n  background: #fff4e6;\n  color: #cc6600;\n  border: 2px solid #ffd9b3;\n}\n\n.learning-style-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 12px 25px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border-radius: 25px;\n  font-weight: 600;\n  font-size: 16px;\n}\n\n.pocket-money-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 15px;\n  flex-wrap: wrap;\n}\n\n.money-amount[_ngcontent-%COMP%] {\n  font-size: 32px;\n  font-weight: bold;\n  color: #28a745;\n}\n\n.money-frequency[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #666;\n  font-weight: 500;\n}\n\n.money-currency[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #999;\n}\n\n\n.action-section[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 40px;\n  padding-top: 30px;\n  border-top: 2px solid #e9ecef;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  padding: 18px 40px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border: none;\n  border-radius: 10px;\n  font-size: 18px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s;\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n}\n\n.btn-primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);\n}\n\n.btn-large[_ngcontent-%COMP%] {\n  font-size: 20px;\n  padding: 20px 50px;\n}\n\n\n@media (max-width: 768px) {\n  .profile-analysis-container[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  \n  .header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.8em;\n  }\n  \n  .child-selector[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  \n  .child-selector[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  \n  .profile-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n  }\n  \n  .detail-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  \n  .reasoning-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n  }\n  \n  .pocket-money-info[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9wcm9maWxlLWFuYWx5c2lzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBaUI7RUFDakIsY0FBYztFQUNkLGFBQWE7RUFDYiw0REFBNEQ7RUFDNUQsbUJBQW1CO0VBQ25CLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLDZEQUE2RDtFQUM3RCxZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsd0NBQXdDO0FBQzFDOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLFNBQVM7RUFDVCxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsWUFBWTtFQUNaLHdDQUF3QztBQUMxQzs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsZUFBZTtFQUNmLG9CQUFvQjtFQUNwQix3Q0FBd0M7QUFDMUM7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0Isd0NBQXdDO0FBQzFDOztBQUVBO0VBQ0UsWUFBWTtFQUNaLG1CQUFtQjtBQUNyQjs7QUFFQSxvQkFBb0I7QUFDcEI7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtBQUNmOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLDZCQUE2QjtFQUM3QixrQkFBa0I7RUFDbEIsV0FBVztFQUNY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Q3RCLGtCQUFrQjtFQUNwQjs7RUFFQTtJQUNFLHVCQUF1QjtFQUN6QjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLnByb2ZpbGUtYW5hbHlzaXMtY29udGFpbmVyIHtcbiAgbWF4LXdpZHRoOiAxMjAwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBwYWRkaW5nOiAyMHB4O1xuICBmb250LWZhbWlseTogJ1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7XG4gIGJhY2tncm91bmQ6ICNmNWY3ZmE7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xufVxuXG4uaGVhZGVyIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2N2VlYSAwJSwgIzc2NGJhMiAxMDAlKTtcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiAzMHB4O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xuICBib3gtc2hhZG93OiAwIDRweCA2cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4uaGVhZGVyIGgxIHtcbiAgbWFyZ2luOiAwIDAgMjBweCAwO1xuICBmb250LXNpemU6IDIuNWVtO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uY2hpbGQtc2VsZWN0b3Ige1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDE1cHg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLmNoaWxkLXNlbGVjdG9yIGxhYmVsIHtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuXG4uY2hpbGQtc2VsZWN0b3IgaW5wdXQge1xuICBwYWRkaW5nOiAxMnB4IDE1cHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBmb250LXNpemU6IDE2cHg7XG4gIHdpZHRoOiAyMDBweDtcbiAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuLmNoaWxkLXNlbGVjdG9yIGlucHV0OmRpc2FibGVkIHtcbiAgYmFja2dyb3VuZDogI2U5ZWNlZjtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLmJ0bi1hbmFseXplIHtcbiAgcGFkZGluZzogMTJweCAyNXB4O1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgY29sb3I6ICM2NjdlZWE7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBmb250LXNpemU6IDE2cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3M7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi5idG4tYW5hbHl6ZTpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgYm94LXNoYWRvdzogMCA0cHggOHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbn1cblxuLmJ0bi1hbmFseXplOmRpc2FibGVkIHtcbiAgb3BhY2l0eTogMC42O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4vKiBMb2FkaW5nIFNlY3Rpb24gKi9cbi5sb2FkaW5nLXNlY3Rpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWluLWhlaWdodDogNDAwcHg7XG59XG5cbi5sb2FkaW5nIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiA0MHB4O1xufVxuXG4uc3Bpbm5lciB7XG4gIGJvcmRlcjogNXB4IHNvbGlkICNmM2YzZjM7XG4gIGJvcmRlci10b3A6IDVweCBzb2xpZCAjNjY3ZWVhO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIHdpZHRoOiA2MHB4O1xuICBoZWlnaHQ6IDYwcHg7XG4gIGFuaW1hdGlvbjogc3BpbiAxcyBsaW5lYXIgaW5maW5pdGU7XG4gIG1hcmdpbjogMCBhdXRvIDMwcHg7XG59XG5cbkBrZXlmcmFtZXMgc3BpbiB7XG4gIDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbn1cblxuLmxvYWRpbmcgaDIge1xuICBjb2xvcjogIzMzMztcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLmxvYWRpbmcgcCB7XG4gIGNvbG9yOiAjNjY2O1xuICBmb250LXNpemU6IDE2cHg7XG59XG5cbi8qIEVycm9yIFNlY3Rpb24gKi9cbi5lcnJvci1zZWN0aW9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1pbi1oZWlnaHQ6IDQwMHB4O1xufVxuXG4uZXJyb3ItY2FyZCB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBwYWRkaW5nOiA0MHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gIG1heC13aWR0aDogNTAwcHg7XG59XG5cbi5lcnJvci1pY29uIHtcbiAgZm9udC1zaXplOiA2MHB4O1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4uZXJyb3ItY2FyZCBoMiB7XG4gIGNvbG9yOiAjYzMzO1xuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xufVxuXG4uZXJyb3ItY2FyZCBwIHtcbiAgY29sb3I6ICM2NjY7XG4gIG1hcmdpbi1ib3R0b206IDI1cHg7XG4gIGZvbnQtc2l6ZTogMTZweDtcbn1cblxuLmJ0bi1yZXRyeSB7XG4gIHBhZGRpbmc6IDEycHggMzBweDtcbiAgYmFja2dyb3VuZDogI2MzMztcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcztcbn1cblxuLmJ0bi1yZXRyeTpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNhMjI7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbn1cblxuLyogUmVzdWx0cyBTZWN0aW9uICovXG4ucmVzdWx0cy1zZWN0aW9uIHtcbiAgYW5pbWF0aW9uOiBmYWRlSW4gMC41cyBlYXNlLWluO1xufVxuXG5Aa2V5ZnJhbWVzIGZhZGVJbiB7XG4gIGZyb20geyBvcGFjaXR5OiAwOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7IH1cbiAgdG8geyBvcGFjaXR5OiAxOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH1cbn1cblxuLnByb2ZpbGUtY2FyZCxcbi5yZWFzb25pbmctY2FyZCxcbi5wZXJzb25hbGl6YXRpb24tY2FyZCB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBwYWRkaW5nOiAzMHB4O1xuICBtYXJnaW4tYm90dG9tOiAyNXB4O1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4uY2FyZC1oZWFkZXIge1xuICBtYXJnaW4tYm90dG9tOiAyNXB4O1xuICBwYWRkaW5nLWJvdHRvbTogMTVweDtcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNlOWVjZWY7XG59XG5cbi5jYXJkLWhlYWRlciBoMiB7XG4gIGNvbG9yOiAjMzMzO1xuICBtYXJnaW46IDAgMCA1cHggMDtcbiAgZm9udC1zaXplOiAxLjhlbTtcbn1cblxuLnN1YnRpdGxlIHtcbiAgY29sb3I6ICM2NjY7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4vKiBQcm9maWxlIENhcmQgKi9cbi5wcm9maWxlLWNvbnRlbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDMwcHg7XG59XG5cbi5wcm9maWxlLWF2YXRhciB7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG4uYXZhdGFyLWNpcmNsZSB7XG4gIHdpZHRoOiAxMDBweDtcbiAgaGVpZ2h0OiAxMDBweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNjY3ZWVhIDAlLCAjNzY0YmEyIDEwMCUpO1xuICBjb2xvcjogd2hpdGU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmb250LXNpemU6IDQwcHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBib3gtc2hhZG93OiAwIDRweCA4cHggcmdiYSgxMDIsIDEyNiwgMjM0LCAwLjMpO1xufVxuXG4ucHJvZmlsZS1kZXRhaWxzIHtcbiAgZmxleDogMTtcbn1cblxuLnByb2ZpbGUtZGV0YWlscyBoMyB7XG4gIGNvbG9yOiAjMzMzO1xuICBmb250LXNpemU6IDJlbTtcbiAgbWFyZ2luOiAwIDAgMjBweCAwO1xufVxuXG4uZGV0YWlsLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDIwMHB4LCAxZnIpKTtcbiAgZ2FwOiAxNXB4O1xufVxuXG4uZGV0YWlsLWl0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDVweDtcbn1cblxuLmxhYmVsIHtcbiAgY29sb3I6ICM2NjY7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuLnZhbHVlIHtcbiAgY29sb3I6ICMzMzM7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLyogUmVhc29uaW5nIENhcmQgKi9cbi5yZWFzb25pbmctY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMjVweDtcbn1cblxuLnJlYXNvbmluZy1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAyMHB4O1xuICBwYWRkaW5nOiAyMHB4O1xuICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGJvcmRlci1sZWZ0OiA0cHggc29saWQgIzY2N2VlYTtcbn1cblxuLnJlYXNvbmluZy1pY29uIHtcbiAgZm9udC1zaXplOiAzMnB4O1xuICBmbGV4LXNocmluazogMDtcbn1cblxuLnJlYXNvbmluZy10ZXh0IHtcbiAgZmxleDogMTtcbn1cblxuLnJlYXNvbmluZy10ZXh0IGg0IHtcbiAgY29sb3I6ICM2NjdlZWE7XG4gIG1hcmdpbjogMCAwIDEwcHggMDtcbiAgZm9udC1zaXplOiAxOHB4O1xufVxuXG4ucmVhc29uaW5nLXRleHQgcCB7XG4gIGNvbG9yOiAjNTU1O1xuICBsaW5lLWhlaWdodDogMS42O1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMTVweDtcbn1cblxuLyogUGVyc29uYWxpemF0aW9uIENhcmQgKi9cbi5wZXJzb25hbGl6YXRpb24tY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMzBweDtcbn1cblxuLmluc2lnaHQtc2VjdGlvbiBoNCB7XG4gIGNvbG9yOiAjMzMzO1xuICBtYXJnaW46IDAgMCAxNXB4IDA7XG4gIGZvbnQtc2l6ZTogMThweDtcbn1cblxuLnRhZ3MtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBnYXA6IDEwcHg7XG59XG5cbi50YWcge1xuICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLmhvYmJ5LXRhZyB7XG4gIGJhY2tncm91bmQ6ICNlN2YzZmY7XG4gIGNvbG9yOiAjMDA2NmNjO1xuICBib3JkZXI6IDJweCBzb2xpZCAjYjNkOWZmO1xufVxuXG4uc3ViamVjdC10YWcge1xuICBiYWNrZ3JvdW5kOiAjZmZmNGU2O1xuICBjb2xvcjogI2NjNjYwMDtcbiAgYm9yZGVyOiAycHggc29saWQgI2ZmZDliMztcbn1cblxuLmxlYXJuaW5nLXN0eWxlLWJhZGdlIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwYWRkaW5nOiAxMnB4IDI1cHg7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM2NjdlZWEgMCUsICM3NjRiYTIgMTAwJSk7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogMjVweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuXG4ucG9ja2V0LW1vbmV5LWluZm8ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XG4gIGdhcDogMTVweDtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuXG4ubW9uZXktYW1vdW50IHtcbiAgZm9udC1zaXplOiAzMnB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgY29sb3I6ICMyOGE3NDU7XG59XG5cbi5tb25leS1mcmVxdWVuY3kge1xuICBmb250LXNpemU6IDE4cHg7XG4gIGNvbG9yOiAjNjY2O1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG4ubW9uZXktY3VycmVuY3kge1xuICBmb250LXNpemU6IDE2cHg7XG4gIGNvbG9yOiAjOTk5O1xufVxuXG4vKiBBY3Rpb24gU2VjdGlvbiAqL1xuLmFjdGlvbi1zZWN0aW9uIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tdG9wOiA0MHB4O1xuICBwYWRkaW5nLXRvcDogMzBweDtcbiAgYm9yZGVyLXRvcDogMnB4IHNvbGlkICNlOWVjZWY7XG59XG5cbi5idG4tcHJpbWFyeSB7XG4gIHBhZGRpbmc6IDE4cHggNDBweDtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2N2VlYSAwJSwgIzc2NGJhMiAxMDAlKTtcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcztcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDEwMiwgMTI2LCAyMzQsIDAuMyk7XG59XG5cbi5idG4tcHJpbWFyeTpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtM3B4KTtcbiAgYm94LXNoYWRvdzogMCA2cHggMjBweCByZ2JhKDEwMiwgMTI2LCAyMzQsIDAuNCk7XG59XG5cbi5idG4tbGFyZ2Uge1xuICBmb250LXNpemU6IDIwcHg7XG4gIHBhZGRpbmc6IDIwcHggNTBweDtcbn1cblxuLyogUmVzcG9uc2l2ZSBEZXNpZ24gKi9cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAucHJvZmlsZS1hbmFseXNpcy1jb250YWluZXIge1xuICAgIHBhZGRpbmc6IDEwcHg7XG4gIH1cbiAgXG4gIC5oZWFkZXIgaDEge1xuICAgIGZvbnQtc2l6ZTogMS44ZW07XG4gIH1cbiAgXG4gIC5jaGlsZC1zZWxlY3RvciB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgfVxuICBcbiAgLmNoaWxkLXNlbGVjdG9yIGlucHV0IHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuICBcbiAgLnByb2ZpbGUtY29udGVudCB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cbiAgXG4gIC5kZXRhaWwtZ3JpZCB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIH1cbiAgXG4gIC5yZWFzb25pbmctaXRlbSB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cbiAgXG4gIC5wb2NrZXQtbW9uZXktaW5mbyB7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIH1cbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 4148:
/*!**********************************************!*\
  !*** ./src/app/components/quiz.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QuizComponent": () => (/* binding */ QuizComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _services_user_profile_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/user-profile.service */ 9618);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4666);



function QuizComponent_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function QuizComponent_button_4_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r5.goBack());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\u2190 Back");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function QuizComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 8)(1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Preparing Your Quiz...");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
}
function QuizComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 11)(1, "div", 12)(2, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "\u274C");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Error");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function QuizComponent_div_6_Template_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r7.loadQuiz());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Retry");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.error);
  }
}
function QuizComponent_div_7_div_8_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function QuizComponent_div_7_div_8_button_6_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r17);
      const option_r13 = restoredCtx.$implicit;
      const question_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r15.selectAnswer(question_r11.id, option_r13));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const option_r13 = ctx.$implicit;
    const i_r14 = ctx.index;
    const question_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("selected", ctx_r12.isAnswerSelected(question_r11.id, option_r13))("correct", ctx_r12.showResults && ctx_r12.isCorrect(question_r11.id, option_r13))("wrong", ctx_r12.showResults && ctx_r12.isWrong(question_r11.id, option_r13));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx_r12.isSubmitted);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx_r12.getCharCode(i_r14), ".");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](option_r13);
  }
}
function QuizComponent_div_7_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 24)(1, "h3", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "p", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, QuizComponent_div_7_div_8_button_6_Template, 5, 9, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const question_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Question ", question_r11.id, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](question_r11.question);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", question_r11.options);
  }
}
function QuizComponent_div_7_p_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" Please answer all ", ctx_r10.quiz.questions.length, " questions ");
  }
}
function QuizComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 15)(1, "div", 16)(2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 17)(5, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, QuizComponent_div_7_div_8_Template, 7, 3, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 21)(10, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function QuizComponent_div_7_Template_button_click_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r20);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r19.submitQuiz());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, QuizComponent_div_7_p_12_Template, 2, 1, "p", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx_r3.quiz.concept, " Quiz");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r3.quiz.difficulty);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r3.quiz.questions);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx_r3.getSelectedAnswersCount() !== ctx_r3.quiz.questions.length || ctx_r3.isSubmitted);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r3.isSubmitted ? "Submitting..." : "Submit Quiz", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.getSelectedAnswersCount() !== ctx_r3.quiz.questions.length);
  }
}
function QuizComponent_div_8_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 40)(1, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Points Earned:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("+", ctx_r21.score * 10, "");
  }
}
function QuizComponent_div_8_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 40)(1, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "New Level:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r22.submissionResult.gamification.level);
  }
}
function QuizComponent_div_8_div_18_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const badge_r28 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" \uD83C\uDF96\uFE0F ", badge_r28, " ");
  }
}
function QuizComponent_div_8_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 40)(1, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "New Badges:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, QuizComponent_div_8_div_18_span_4_Template, 2, 1, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r23.submissionResult.gamification.badges);
  }
}
function QuizComponent_div_8_div_19_div_3_div_4_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\u2713 Correct");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function QuizComponent_div_8_div_19_div_3_div_4_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\u2717 Your Answer");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function QuizComponent_div_8_div_19_div_3_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 58)(1, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, QuizComponent_div_8_div_19_div_3_div_4_span_5_Template, 2, 0, "span", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, QuizComponent_div_8_div_19_div_3_div_4_span_6_Template, 2, 0, "span", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r32 = ctx.$implicit;
    const question_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("correct-answer", option_r32 === question_r30.correctAnswer)("selected-answer", ctx_r31.selectedAnswers[question_r30.id] === option_r32 && option_r32 !== question_r30.correctAnswer);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx_r31.getCharCode(question_r30.options.indexOf(option_r32)), ".");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](option_r32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", option_r32 === question_r30.correctAnswer);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r31.selectedAnswers[question_r30.id] === option_r32 && option_r32 !== question_r30.correctAnswer);
  }
}
function QuizComponent_div_8_div_19_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 54)(1, "p", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, QuizComponent_div_8_div_19_div_3_div_4_Template, 7, 8, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const question_r30 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](question_r30.question);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", question_r30.options);
  }
}
function QuizComponent_div_8_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 52)(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Review Your Answers");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, QuizComponent_div_8_div_19_div_3_Template, 5, 2, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r24.quiz.questions);
  }
}
function QuizComponent_div_8_button_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function QuizComponent_div_8_button_21_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r37);
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r36.continueLearning());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " \uD83D\uDCD6 Continue to Next Story ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function QuizComponent_div_8_button_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r39 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function QuizComponent_div_8_button_22_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r39);
      const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r38.goBack());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " \uD83D\uDCDA Review Story Again ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function QuizComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 33)(1, "div", 34)(2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "\uD83C\uDF89 Quiz Results");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 35)(5, "div", 36)(6, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "p", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 39)(11, "div", 40)(12, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Correct Answers:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](16, QuizComponent_div_8_div_16_Template, 5, 1, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, QuizComponent_div_8_div_17_Template, 5, 1, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](18, QuizComponent_div_8_div_18_Template, 5, 1, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, QuizComponent_div_8_div_19_Template, 4, 1, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](21, QuizComponent_div_8_button_21_Template, 2, 0, "button", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](22, QuizComponent_div_8_button_22_Template, 2, 0, "button", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "button", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function QuizComponent_div_8_Template_button_click_23_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r41);
      const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r40.continueLearning());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, " \uD83C\uDFE0 Back to Home ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("passed", ctx_r4.passed)("failed", !ctx_r4.passed);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx_r4.score, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r4.passed ? "Passed!" : "Try Again");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", ctx_r4.correctAnswers, " / ", ctx_r4.totalQuestions, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r4.submissionResult.gamification);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r4.submissionResult.gamification);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r4.submissionResult.gamification == null ? null : ctx_r4.submissionResult.gamification.badges == null ? null : ctx_r4.submissionResult.gamification.badges.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r4.quiz);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r4.passed && ctx_r4.submissionResult.nextStoryAvailable);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r4.passed);
  }
}
class QuizComponent {
  userProfileService;
  quiz = null;
  story = null;
  profile = null;
  isLoading = false;
  error = null;
  selectedAnswers = {};
  isSubmitted = false;
  score = 0;
  totalQuestions = 0;
  correctAnswers = 0;
  passed = false;
  showResults = false;
  submissionResult = null;
  constructor(userProfileService) {
    this.userProfileService = userProfileService;
  }
  ngOnInit() {
    // Get story and profile from service
    this.story = this.userProfileService.currentStory;
    this.profile = this.userProfileService.currentProfile;
    if (this.story) {
      this.loadQuiz();
    } else {
      this.error = 'No story available. Please read a story first.';
    }
  }
  loadQuiz() {
    if (!this.story) return;
    this.isLoading = true;
    this.error = null;
    const request = {
      story: this.story
    };
    if (this.profile) {
      request.profile = this.profile;
    }
    this.userProfileService.generateQuiz(this.story, this.profile).subscribe({
      next: response => {
        if (response.success) {
          this.quiz = response.quiz;
          this.isLoading = false;
        }
      },
      error: error => {
        this.error = error.error?.detail || 'Failed to load quiz';
        this.isLoading = false;
        console.error('Quiz loading error:', error);
      }
    });
  }
  selectAnswer(questionId, answer) {
    if (!this.isSubmitted) {
      this.selectedAnswers[questionId] = answer;
    }
  }
  submitQuiz() {
    if (!this.quiz || !this.story) return;
    // Build correct answers map
    const correctAnswers = {};
    this.quiz.questions.forEach(q => {
      correctAnswers[q.id] = q.correctAnswer;
    });
    const submission = {
      quizId: this.quiz.quizId,
      answers: this.selectedAnswers,
      correctAnswers: correctAnswers
    };
    this.isLoading = true;
    const childId = this.story.childId || 'kid_001';
    this.userProfileService.submitQuiz(childId, submission).subscribe({
      next: response => {
        this.score = response.score;
        this.totalQuestions = response.totalQuestions;
        this.correctAnswers = response.correctAnswers;
        this.passed = response.passed;
        this.submissionResult = response;
        this.isSubmitted = true;
        this.showResults = true;
        this.isLoading = false;
      },
      error: error => {
        this.error = error.error?.detail || 'Failed to submit quiz';
        this.isLoading = false;
        console.error('Quiz submission error:', error);
      }
    });
  }
  isAnswerSelected(questionId, answer) {
    return this.selectedAnswers[questionId] === answer;
  }
  isCorrect(questionId, answer) {
    if (!this.quiz || !this.showResults) return false;
    const question = this.quiz.questions.find(q => q.id === questionId);
    return question?.correctAnswer === answer;
  }
  isWrong(questionId, answer) {
    if (!this.quiz || !this.showResults) return false;
    return this.selectedAnswers[questionId] === answer && !this.isCorrect(questionId, answer);
  }
  goBack() {
    // Navigate back
    if (this.userProfileService) {
      this.userProfileService.navigateToStory?.();
    }
  }
  continueLearning() {
    // Navigate to next story or home
    if (this.userProfileService) {
      this.userProfileService.navigateToHome?.();
    }
  }
  // Helper methods for template
  getCharCode(index) {
    return String.fromCharCode(65 + index);
  }
  getObjectKeys(obj) {
    return Object.keys(obj);
  }
  getSelectedAnswersCount() {
    return Object.keys(this.selectedAnswers).length;
  }
  static ɵfac = function QuizComponent_Factory(t) {
    return new (t || QuizComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_user_profile_service__WEBPACK_IMPORTED_MODULE_0__.UserProfileService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: QuizComponent,
    selectors: [["app-quiz"]],
    decls: 9,
    vars: 5,
    consts: [[1, "quiz-container"], [1, "header"], ["class", "btn-back", 3, "click", 4, "ngIf"], ["class", "loading-section", 4, "ngIf"], ["class", "error-section", 4, "ngIf"], ["class", "quiz-content", 4, "ngIf"], ["class", "results-section", 4, "ngIf"], [1, "btn-back", 3, "click"], [1, "loading-section"], [1, "loading"], [1, "spinner"], [1, "error-section"], [1, "error-card"], [1, "error-icon"], [1, "btn-retry", 3, "click"], [1, "quiz-content"], [1, "quiz-header"], [1, "quiz-meta"], [1, "badge"], [1, "questions-container"], ["class", "question-card", 4, "ngFor", "ngForOf"], [1, "submit-section"], [1, "btn-submit", 3, "disabled", "click"], ["class", "hint", 4, "ngIf"], [1, "question-card"], [1, "question-number"], [1, "question-text"], [1, "options-container"], ["class", "option-btn", 3, "selected", "correct", "wrong", "disabled", "click", 4, "ngFor", "ngForOf"], [1, "option-btn", 3, "disabled", "click"], [1, "option-letter"], [1, "option-text"], [1, "hint"], [1, "results-section"], [1, "results-header"], [1, "score-display"], [1, "score-circle"], [1, "score-value"], [1, "score-label"], [1, "results-details"], [1, "result-item"], [1, "result-label"], [1, "result-value"], ["class", "result-item", 4, "ngIf"], ["class", "review-section", 4, "ngIf"], [1, "action-buttons"], ["class", "btn-primary", 3, "click", 4, "ngIf"], ["class", "btn-secondary", 3, "click", 4, "ngIf"], [1, "btn-secondary", 3, "click"], [1, "badges-list"], ["class", "badge-item", 4, "ngFor", "ngForOf"], [1, "badge-item"], [1, "review-section"], ["class", "review-question", 4, "ngFor", "ngForOf"], [1, "review-question"], [1, "review-question-text"], [1, "review-answers"], ["class", "review-option", 3, "correct-answer", "selected-answer", 4, "ngFor", "ngForOf"], [1, "review-option"], ["class", "answer-indicator", 4, "ngIf"], ["class", "answer-indicator wrong", 4, "ngIf"], [1, "answer-indicator"], [1, "answer-indicator", "wrong"], [1, "btn-primary", 3, "click"]],
    template: function QuizComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "\uD83D\uDCDD Quiz Time!");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, QuizComponent_button_4_Template, 2, 0, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, QuizComponent_div_5_Template, 5, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, QuizComponent_div_6_Template, 10, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, QuizComponent_div_7_Template, 13, 6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, QuizComponent_div_8_Template, 25, 14, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.showResults);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoading && !ctx.quiz);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.error && !ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.quiz && !ctx.showResults);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showResults && ctx.submissionResult);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf],
    styles: [".quiz-container[_ngcontent-%COMP%] {\n  max-width: 1000px;\n  margin: 0 auto;\n  padding: 20px;\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n  background: #f5f7fa;\n  min-height: 100vh;\n}\n\n.header[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);\n  color: white;\n  padding: 30px;\n  border-radius: 12px;\n  margin-bottom: 30px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 2.5em;\n  font-weight: 600;\n}\n\n.btn-back[_ngcontent-%COMP%] {\n  padding: 12px 25px;\n  background: white;\n  color: #4facfe;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n\n.btn-back[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n}\n\n.loading-section[_ngcontent-%COMP%], .error-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 400px;\n}\n\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.spinner[_ngcontent-%COMP%] {\n  border: 5px solid #f3f3f3;\n  border-top: 5px solid #4facfe;\n  border-radius: 50%;\n  width: 60px;\n  height: 60px;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto 30px;\n}\n\n@keyframes _ngcontent-%COMP%_spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n.error-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 40px;\n  text-align: center;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n.error-icon[_ngcontent-%COMP%] {\n  font-size: 60px;\n  margin-bottom: 20px;\n}\n\n.btn-retry[_ngcontent-%COMP%] {\n  padding: 12px 30px;\n  background: #c33;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  margin-top: 20px;\n}\n\n.quiz-content[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.5s ease-in;\n}\n\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.quiz-header[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 25px;\n  margin-bottom: 25px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  text-align: center;\n}\n\n.quiz-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #333;\n  margin: 0 0 15px 0;\n}\n\n.quiz-meta[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 10px;\n}\n\n.badge[_ngcontent-%COMP%] {\n  padding: 8px 20px;\n  background: #e7f3ff;\n  color: #0066cc;\n  border-radius: 20px;\n  font-weight: 600;\n}\n\n.questions-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 25px;\n  margin-bottom: 30px;\n}\n\n.question-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 30px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n.question-number[_ngcontent-%COMP%] {\n  color: #4facfe;\n  margin: 0 0 15px 0;\n  font-size: 18px;\n}\n\n.question-text[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 500;\n  color: #333;\n  margin: 0 0 20px 0;\n  line-height: 1.6;\n}\n\n.options-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.option-btn[_ngcontent-%COMP%] {\n  padding: 15px 20px;\n  background: #f8f9fa;\n  border: 2px solid #dee2e6;\n  border-radius: 10px;\n  text-align: left;\n  cursor: pointer;\n  transition: all 0.3s;\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  font-size: 16px;\n}\n\n.option-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: #4facfe;\n  background: #e7f3ff;\n}\n\n.option-btn.selected[_ngcontent-%COMP%] {\n  border-color: #4facfe;\n  background: #e7f3ff;\n  color: #0066cc;\n}\n\n.option-btn.correct[_ngcontent-%COMP%] {\n  border-color: #28a745;\n  background: #d4edda;\n  color: #155724;\n}\n\n.option-btn.wrong[_ngcontent-%COMP%] {\n  border-color: #dc3545;\n  background: #f8d7da;\n  color: #721c24;\n}\n\n.option-btn[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n}\n\n.option-letter[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 18px;\n  min-width: 30px;\n}\n\n.submit-section[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 30px;\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n.btn-submit[_ngcontent-%COMP%] {\n  padding: 18px 50px;\n  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);\n  color: white;\n  border: none;\n  border-radius: 10px;\n  font-size: 20px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s;\n  box-shadow: 0 4px 12px rgba(79, 172, 254, 0.3);\n}\n\n.btn-submit[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-3px);\n  box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4);\n}\n\n.btn-submit[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n.hint[_ngcontent-%COMP%] {\n  color: #666;\n  margin-top: 15px;\n  font-size: 14px;\n}\n\n\n.results-section[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.5s ease-in;\n}\n\n.results-header[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 40px;\n  margin-bottom: 25px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  text-align: center;\n}\n\n.results-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #333;\n  margin: 0 0 30px 0;\n}\n\n.score-display[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 15px;\n}\n\n.score-circle[_ngcontent-%COMP%] {\n  width: 150px;\n  height: 150px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 36px;\n  font-weight: bold;\n  color: white;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);\n}\n\n.score-circle.passed[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);\n}\n\n.score-circle.failed[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%);\n}\n\n.score-label[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 600;\n  color: #333;\n}\n\n.results-details[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 30px;\n  margin-bottom: 25px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n.result-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 15px 0;\n  border-bottom: 1px solid #e9ecef;\n}\n\n.result-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.result-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #666;\n}\n\n.result-value[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: bold;\n  color: #333;\n}\n\n.badges-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.badge-item[_ngcontent-%COMP%] {\n  padding: 8px 15px;\n  background: #fff4e6;\n  color: #cc6600;\n  border-radius: 20px;\n  font-size: 14px;\n  font-weight: 500;\n}\n\n.review-section[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 30px;\n  margin-bottom: 25px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n.review-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #333;\n  margin: 0 0 25px 0;\n}\n\n.review-question[_ngcontent-%COMP%] {\n  margin-bottom: 30px;\n  padding-bottom: 25px;\n  border-bottom: 2px solid #e9ecef;\n}\n\n.review-question[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.review-question-text[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 500;\n  color: #333;\n  margin: 0 0 15px 0;\n}\n\n.review-answers[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.review-option[_ngcontent-%COMP%] {\n  padding: 12px 15px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: #f8f9fa;\n  border: 2px solid transparent;\n}\n\n.review-option.correct-answer[_ngcontent-%COMP%] {\n  background: #d4edda;\n  border-color: #28a745;\n  color: #155724;\n}\n\n.review-option.selected-answer[_ngcontent-%COMP%] {\n  background: #f8d7da;\n  border-color: #dc3545;\n  color: #721c24;\n}\n\n.answer-indicator[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-weight: 600;\n  font-size: 14px;\n}\n\n.answer-indicator.wrong[_ngcontent-%COMP%] {\n  color: #dc3545;\n}\n\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 15px;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n\n.btn-primary[_ngcontent-%COMP%], .btn-secondary[_ngcontent-%COMP%] {\n  padding: 15px 30px;\n  border: none;\n  border-radius: 10px;\n  font-size: 18px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);\n  color: white;\n}\n\n.btn-primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4);\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #6c757d;\n  color: white;\n}\n\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #5a6268;\n  transform: translateY(-3px);\n}\n\n@media (max-width: 768px) {\n  .quiz-container[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  \n  .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 15px;\n  }\n  \n  .action-buttons[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  \n  .btn-primary[_ngcontent-%COMP%], .btn-secondary[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9xdWl6LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBaUI7RUFDakIsY0FBYztFQUNkLGFBQWE7RUFDYiw0REFBNEQ7RUFDNUQsbUJBQW1CO0VBQ25CLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLDZEQUE2RDtFQUM3RCxZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsd0NBQXdDO0VBQ3hDLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsU0FBUztFQUNULGdCQUFnQjtFQUNoQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2Ysb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsMkJBQTJCO0VBQzNCLHdDQUF3QztBQUMxQzs7QUFFQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6Qiw2QkFBNkI7RUFDN0Isa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0NBQWtDO0VBQ2xDLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLEtBQUssdUJBQXVCLEVBQUU7RUFDOUIsT0FBTyx5QkFBeUIsRUFBRTtBQUNwQzs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQix3Q0FBd0M7QUFDMUM7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLE9BQU8sVUFBVSxFQUFFLDJCQUEyQixFQUFFO0VBQ2hELEtBQUssVUFBVSxFQUFFLHdCQUF3QixFQUFFO0FBQzdDOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHdDQUF3QztFQUN4QyxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsbUJBQW1CO0VBQ25CLGNBQWM7RUFDZCxtQkFBbUI7RUFDbkIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixTQUFTO0VBQ1QsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2Isd0NBQXdDO0FBQzFDOztBQUVBO0VBQ0UsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsU0FBUztBQUNYOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsbUJBQW1CO0VBQ25CLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2Ysb0JBQW9CO0VBQ3BCLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsU0FBUztFQUNULGVBQWU7QUFDakI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixlQUFlO0FBQ2pCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixpQkFBaUI7RUFDakIsbUJBQW1CO0VBQ25CLHdDQUF3QztBQUMxQzs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQiw2REFBNkQ7RUFDN0QsWUFBWTtFQUNaLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2Ysb0JBQW9CO0VBQ3BCLDhDQUE4QztBQUNoRDs7QUFFQTtFQUNFLDJCQUEyQjtFQUMzQiw4Q0FBOEM7QUFDaEQ7O0FBRUE7RUFDRSxZQUFZO0VBQ1osbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGdCQUFnQjtFQUNoQixlQUFlO0FBQ2pCOztBQUVBLG9CQUFvQjtBQUNwQjtFQUNFLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix3Q0FBd0M7RUFDeEMsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsWUFBWTtFQUNaLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLDZEQUE2RDtBQUMvRDs7QUFFQTtFQUNFLDZEQUE2RDtBQUMvRDs7QUFFQTtFQUNFLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsV0FBVztBQUNiOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHdDQUF3QztBQUMxQzs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixnQ0FBZ0M7QUFDbEM7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsV0FBVztBQUNiOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZUFBZTtFQUNmLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixtQkFBbUI7RUFDbkIsY0FBYztFQUNkLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2YsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHdDQUF3QztBQUMxQzs7QUFFQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsb0JBQW9CO0VBQ3BCLGdDQUFnQztBQUNsQzs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsU0FBUztBQUNYOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLFNBQVM7RUFDVCxtQkFBbUI7RUFDbkIsNkJBQTZCO0FBQy9COztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLHFCQUFxQjtFQUNyQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLHFCQUFxQjtFQUNyQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixTQUFTO0VBQ1QsdUJBQXVCO0VBQ3ZCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSw2REFBNkQ7RUFDN0QsWUFBWTtBQUNkOztBQUVBO0VBQ0UsMkJBQTJCO0VBQzNCLDhDQUE4QztBQUNoRDs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0U7SUFDRSxhQUFhO0VBQ2Y7O0VBRUE7SUFDRSxzQkFBc0I7SUFDdEIsU0FBUztFQUNYOztFQUVBO0lBQ0Usc0JBQXNCO0VBQ3hCOztFQUVBO0lBQ0UsV0FBVztFQUNiO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIucXVpei1jb250YWluZXIge1xuICBtYXgtd2lkdGg6IDEwMDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIHBhZGRpbmc6IDIwcHg7XG4gIGZvbnQtZmFtaWx5OiAnU2Vnb2UgVUknLCBUYWhvbWEsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZjtcbiAgYmFja2dyb3VuZDogI2Y1ZjdmYTtcbiAgbWluLWhlaWdodDogMTAwdmg7XG59XG5cbi5oZWFkZXIge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNGZhY2ZlIDAlLCAjMDBmMmZlIDEwMCUpO1xuICBjb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDMwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmhlYWRlciBoMSB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiAyLjVlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLmJ0bi1iYWNrIHtcbiAgcGFkZGluZzogMTJweCAyNXB4O1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgY29sb3I6ICM0ZmFjZmU7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzO1xufVxuXG4uYnRuLWJhY2s6aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMik7XG59XG5cbi5sb2FkaW5nLXNlY3Rpb24sIC5lcnJvci1zZWN0aW9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1pbi1oZWlnaHQ6IDQwMHB4O1xufVxuXG4ubG9hZGluZyB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnNwaW5uZXIge1xuICBib3JkZXI6IDVweCBzb2xpZCAjZjNmM2YzO1xuICBib3JkZXItdG9wOiA1cHggc29saWQgIzRmYWNmZTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICB3aWR0aDogNjBweDtcbiAgaGVpZ2h0OiA2MHB4O1xuICBhbmltYXRpb246IHNwaW4gMXMgbGluZWFyIGluZmluaXRlO1xuICBtYXJnaW46IDAgYXV0byAzMHB4O1xufVxuXG5Aa2V5ZnJhbWVzIHNwaW4ge1xuICAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XG59XG5cbi5lcnJvci1jYXJkIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHBhZGRpbmc6IDQwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuLmVycm9yLWljb24ge1xuICBmb250LXNpemU6IDYwcHg7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5cbi5idG4tcmV0cnkge1xuICBwYWRkaW5nOiAxMnB4IDMwcHg7XG4gIGJhY2tncm91bmQ6ICNjMzM7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgbWFyZ2luLXRvcDogMjBweDtcbn1cblxuLnF1aXotY29udGVudCB7XG4gIGFuaW1hdGlvbjogZmFkZUluIDAuNXMgZWFzZS1pbjtcbn1cblxuQGtleWZyYW1lcyBmYWRlSW4ge1xuICBmcm9tIHsgb3BhY2l0eTogMDsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpOyB9XG4gIHRvIHsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9XG59XG5cbi5xdWl6LWhlYWRlciB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBwYWRkaW5nOiAyNXB4O1xuICBtYXJnaW4tYm90dG9tOiAyNXB4O1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5xdWl6LWhlYWRlciBoMiB7XG4gIGNvbG9yOiAjMzMzO1xuICBtYXJnaW46IDAgMCAxNXB4IDA7XG59XG5cbi5xdWl6LW1ldGEge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiAxMHB4O1xufVxuXG4uYmFkZ2Uge1xuICBwYWRkaW5nOiA4cHggMjBweDtcbiAgYmFja2dyb3VuZDogI2U3ZjNmZjtcbiAgY29sb3I6ICMwMDY2Y2M7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5xdWVzdGlvbnMtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAyNXB4O1xuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xufVxuXG4ucXVlc3Rpb24tY2FyZCB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBwYWRkaW5nOiAzMHB4O1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4ucXVlc3Rpb24tbnVtYmVyIHtcbiAgY29sb3I6ICM0ZmFjZmU7XG4gIG1hcmdpbjogMCAwIDE1cHggMDtcbiAgZm9udC1zaXplOiAxOHB4O1xufVxuXG4ucXVlc3Rpb24tdGV4dCB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgY29sb3I6ICMzMzM7XG4gIG1hcmdpbjogMCAwIDIwcHggMDtcbiAgbGluZS1oZWlnaHQ6IDEuNjtcbn1cblxuLm9wdGlvbnMtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxMnB4O1xufVxuXG4ub3B0aW9uLWJ0biB7XG4gIHBhZGRpbmc6IDE1cHggMjBweDtcbiAgYmFja2dyb3VuZDogI2Y4ZjlmYTtcbiAgYm9yZGVyOiAycHggc29saWQgI2RlZTJlNjtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcztcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxNXB4O1xuICBmb250LXNpemU6IDE2cHg7XG59XG5cbi5vcHRpb24tYnRuOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHtcbiAgYm9yZGVyLWNvbG9yOiAjNGZhY2ZlO1xuICBiYWNrZ3JvdW5kOiAjZTdmM2ZmO1xufVxuXG4ub3B0aW9uLWJ0bi5zZWxlY3RlZCB7XG4gIGJvcmRlci1jb2xvcjogIzRmYWNmZTtcbiAgYmFja2dyb3VuZDogI2U3ZjNmZjtcbiAgY29sb3I6ICMwMDY2Y2M7XG59XG5cbi5vcHRpb24tYnRuLmNvcnJlY3Qge1xuICBib3JkZXItY29sb3I6ICMyOGE3NDU7XG4gIGJhY2tncm91bmQ6ICNkNGVkZGE7XG4gIGNvbG9yOiAjMTU1NzI0O1xufVxuXG4ub3B0aW9uLWJ0bi53cm9uZyB7XG4gIGJvcmRlci1jb2xvcjogI2RjMzU0NTtcbiAgYmFja2dyb3VuZDogI2Y4ZDdkYTtcbiAgY29sb3I6ICM3MjFjMjQ7XG59XG5cbi5vcHRpb24tYnRuOmRpc2FibGVkIHtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLm9wdGlvbi1sZXR0ZXIge1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBtaW4td2lkdGg6IDMwcHg7XG59XG5cbi5zdWJtaXQtc2VjdGlvbiB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZzogMzBweDtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi5idG4tc3VibWl0IHtcbiAgcGFkZGluZzogMThweCA1MHB4O1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNGZhY2ZlIDAlLCAjMDBmMmZlIDEwMCUpO1xuICBjb2xvcjogd2hpdGU7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzO1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoNzksIDE3MiwgMjU0LCAwLjMpO1xufVxuXG4uYnRuLXN1Ym1pdDpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtM3B4KTtcbiAgYm94LXNoYWRvdzogMCA2cHggMjBweCByZ2JhKDc5LCAxNzIsIDI1NCwgMC40KTtcbn1cblxuLmJ0bi1zdWJtaXQ6ZGlzYWJsZWQge1xuICBvcGFjaXR5OiAwLjY7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbi5oaW50IHtcbiAgY29sb3I6ICM2NjY7XG4gIG1hcmdpbi10b3A6IDE1cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLyogUmVzdWx0cyBTZWN0aW9uICovXG4ucmVzdWx0cy1zZWN0aW9uIHtcbiAgYW5pbWF0aW9uOiBmYWRlSW4gMC41cyBlYXNlLWluO1xufVxuXG4ucmVzdWx0cy1oZWFkZXIge1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgcGFkZGluZzogNDBweDtcbiAgbWFyZ2luLWJvdHRvbTogMjVweDtcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ucmVzdWx0cy1oZWFkZXIgaDIge1xuICBjb2xvcjogIzMzMztcbiAgbWFyZ2luOiAwIDAgMzBweCAwO1xufVxuXG4uc2NvcmUtZGlzcGxheSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTVweDtcbn1cblxuLnNjb3JlLWNpcmNsZSB7XG4gIHdpZHRoOiAxNTBweDtcbiAgaGVpZ2h0OiAxNTBweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAzNnB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgY29sb3I6IHdoaXRlO1xuICBib3gtc2hhZG93OiAwIDRweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbn1cblxuLnNjb3JlLWNpcmNsZS5wYXNzZWQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMjhhNzQ1IDAlLCAjMjBjOTk3IDEwMCUpO1xufVxuXG4uc2NvcmUtY2lyY2xlLmZhaWxlZCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNkYzM1NDUgMCUsICNmZDdlMTQgMTAwJSk7XG59XG5cbi5zY29yZS1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMzMzM7XG59XG5cbi5yZXN1bHRzLWRldGFpbHMge1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgcGFkZGluZzogMzBweDtcbiAgbWFyZ2luLWJvdHRvbTogMjVweDtcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuLnJlc3VsdC1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAxNXB4IDA7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTllY2VmO1xufVxuXG4ucmVzdWx0LWl0ZW06bGFzdC1jaGlsZCB7XG4gIGJvcmRlci1ib3R0b206IG5vbmU7XG59XG5cbi5yZXN1bHQtbGFiZWwge1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzY2Njtcbn1cblxuLnJlc3VsdC12YWx1ZSB7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGNvbG9yOiAjMzMzO1xufVxuXG4uYmFkZ2VzLWxpc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogMTBweDtcbn1cblxuLmJhZGdlLWl0ZW0ge1xuICBwYWRkaW5nOiA4cHggMTVweDtcbiAgYmFja2dyb3VuZDogI2ZmZjRlNjtcbiAgY29sb3I6ICNjYzY2MDA7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuLnJldmlldy1zZWN0aW9uIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHBhZGRpbmc6IDMwcHg7XG4gIG1hcmdpbi1ib3R0b206IDI1cHg7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi5yZXZpZXctc2VjdGlvbiBoMyB7XG4gIGNvbG9yOiAjMzMzO1xuICBtYXJnaW46IDAgMCAyNXB4IDA7XG59XG5cbi5yZXZpZXctcXVlc3Rpb24ge1xuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMjVweDtcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNlOWVjZWY7XG59XG5cbi5yZXZpZXctcXVlc3Rpb246bGFzdC1jaGlsZCB7XG4gIGJvcmRlci1ib3R0b206IG5vbmU7XG59XG5cbi5yZXZpZXctcXVlc3Rpb24tdGV4dCB7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgY29sb3I6ICMzMzM7XG4gIG1hcmdpbjogMCAwIDE1cHggMDtcbn1cblxuLnJldmlldy1hbnN3ZXJzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxMHB4O1xufVxuXG4ucmV2aWV3LW9wdGlvbiB7XG4gIHBhZGRpbmc6IDEycHggMTVweDtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEwcHg7XG4gIGJhY2tncm91bmQ6ICNmOGY5ZmE7XG4gIGJvcmRlcjogMnB4IHNvbGlkIHRyYW5zcGFyZW50O1xufVxuXG4ucmV2aWV3LW9wdGlvbi5jb3JyZWN0LWFuc3dlciB7XG4gIGJhY2tncm91bmQ6ICNkNGVkZGE7XG4gIGJvcmRlci1jb2xvcjogIzI4YTc0NTtcbiAgY29sb3I6ICMxNTU3MjQ7XG59XG5cbi5yZXZpZXctb3B0aW9uLnNlbGVjdGVkLWFuc3dlciB7XG4gIGJhY2tncm91bmQ6ICNmOGQ3ZGE7XG4gIGJvcmRlci1jb2xvcjogI2RjMzU0NTtcbiAgY29sb3I6ICM3MjFjMjQ7XG59XG5cbi5hbnN3ZXItaW5kaWNhdG9yIHtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLmFuc3dlci1pbmRpY2F0b3Iud3Jvbmcge1xuICBjb2xvcjogI2RjMzU0NTtcbn1cblxuLmFjdGlvbi1idXR0b25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAxNXB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuXG4uYnRuLXByaW1hcnksIC5idG4tc2Vjb25kYXJ5IHtcbiAgcGFkZGluZzogMTVweCAzMHB4O1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcztcbn1cblxuLmJ0bi1wcmltYXJ5IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzRmYWNmZSAwJSwgIzAwZjJmZSAxMDAlKTtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uYnRuLXByaW1hcnk6aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCk7XG4gIGJveC1zaGFkb3c6IDAgNnB4IDIwcHggcmdiYSg3OSwgMTcyLCAyNTQsIDAuNCk7XG59XG5cbi5idG4tc2Vjb25kYXJ5IHtcbiAgYmFja2dyb3VuZDogIzZjNzU3ZDtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uYnRuLXNlY29uZGFyeTpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICM1YTYyNjg7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtM3B4KTtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5xdWl6LWNvbnRhaW5lciB7XG4gICAgcGFkZGluZzogMTBweDtcbiAgfVxuICBcbiAgLmhlYWRlciB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBnYXA6IDE1cHg7XG4gIH1cbiAgXG4gIC5hY3Rpb24tYnV0dG9ucyB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuICBcbiAgLmJ0bi1wcmltYXJ5LCAuYnRuLXNlY29uZGFyeSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 4906:
/*!*************************************************!*\
  !*** ./src/app/components/rewards.component.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RewardsComponent": () => (/* binding */ RewardsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _services_user_profile_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/user-profile.service */ 9618);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4666);



function RewardsComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 6)(1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Loading Your Rewards...");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
}
function RewardsComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 9)(1, "div", 10)(2, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "\u274C");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Error");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function RewardsComponent_div_7_Template_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r3.loadRewards());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Retry");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.error);
  }
}
function RewardsComponent_div_8_div_32_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 40)(1, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "\uD83C\uDF96\uFE0F");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const badge_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](badge_r8);
  }
}
function RewardsComponent_div_8_div_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, RewardsComponent_div_8_div_32_div_1_Template, 5, 1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r5.rewards.badges);
  }
}
function RewardsComponent_div_8_div_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 43)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "No badges yet. Complete quizzes to earn badges!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function RewardsComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 13)(1, "div", 14)(2, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "\u2B50");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 16)(5, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Total Points");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 17)(8, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "points");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 20)(13, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "\uD83C\uDFC6");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 16)(16, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Current Level");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "div", 21)(19, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "div", 23)(22, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](23, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "div", 27)(27, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](28, "\uD83C\uDF96\uFE0F");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "div", 16)(30, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "Badges Earned");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](32, RewardsComponent_div_8_div_32_Template, 2, 1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](33, RewardsComponent_div_8_div_33_Template, 3, 0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "div", 30)(35, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](36, "\uD83D\uDCCA Achievement Summary");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "div", 31)(38, "div", 32)(39, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](40, "\u2B50");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "div", 34)(42, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](43, "Total Points");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](46, "div", 32)(47, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](48, "\uD83C\uDFC6");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](49, "div", 34)(50, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](51, "Current Level");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](52, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](53);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](54, "div", 32)(55, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](56, "\uD83C\uDF96\uFE0F");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](57, "div", 34)(58, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](59, "Badges");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](60, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](61);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](62, "div", 37)(63, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](64, "\uD83C\uDF89 Keep learning to earn more points and unlock new badges!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.rewards.points);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Level ", ctx_r2.rewards.level, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("width", ctx_r2.getLevelProgress(), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate3"](" ", ctx_r2.rewards.points, " / ", ctx_r2.getPointsForNextLevel(), " points to Level ", ctx_r2.rewards.level + 1, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.rewards.badges && ctx_r2.rewards.badges.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r2.rewards.badges || ctx_r2.rewards.badges.length === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.rewards.points);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.rewards.level);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"]((ctx_r2.rewards.badges == null ? null : ctx_r2.rewards.badges.length) || 0);
  }
}
class RewardsComponent {
  userProfileService;
  childId = 'kid_001';
  rewards = null;
  isLoading = false;
  error = null;
  constructor(userProfileService) {
    this.userProfileService = userProfileService;
  }
  ngOnInit() {
    this.loadRewards();
  }
  loadRewards() {
    this.isLoading = true;
    this.error = null;
    this.userProfileService.getRewards(this.childId).subscribe({
      next: response => {
        if (response.success) {
          this.rewards = response;
          this.isLoading = false;
        }
      },
      error: error => {
        this.error = error.error?.detail || 'Failed to load rewards';
        this.isLoading = false;
        console.error('Rewards loading error:', error);
      }
    });
  }
  goHome() {
    if (this.userProfileService) {
      this.userProfileService.navigateToHome?.();
    }
  }
  getLevelProgress() {
    if (!this.rewards) return 0;
    const currentLevelPoints = (this.rewards.level - 1) * 100;
    const nextLevelPoints = this.rewards.level * 100;
    const progress = (this.rewards.points - currentLevelPoints) / (nextLevelPoints - currentLevelPoints) * 100;
    return Math.min(100, Math.max(0, progress));
  }
  getPointsForNextLevel() {
    if (!this.rewards) return 100;
    return this.rewards.level * 100;
  }
  static ɵfac = function RewardsComponent_Factory(t) {
    return new (t || RewardsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_user_profile_service__WEBPACK_IMPORTED_MODULE_0__.UserProfileService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: RewardsComponent,
    selectors: [["app-rewards"]],
    decls: 9,
    vars: 3,
    consts: [[1, "rewards-container"], [1, "header"], [1, "btn-back", 3, "click"], ["class", "loading-section", 4, "ngIf"], ["class", "error-section", 4, "ngIf"], ["class", "rewards-content", 4, "ngIf"], [1, "loading-section"], [1, "loading"], [1, "spinner"], [1, "error-section"], [1, "error-card"], [1, "error-icon"], [1, "btn-retry", 3, "click"], [1, "rewards-content"], [1, "reward-card", "points-card"], [1, "card-icon"], [1, "card-content"], [1, "points-display"], [1, "points-value"], [1, "points-label"], [1, "reward-card", "level-card"], [1, "level-display"], [1, "level-value"], [1, "progress-bar-container"], [1, "progress-bar"], [1, "progress-fill"], [1, "progress-text"], [1, "reward-card", "badges-card"], ["class", "badges-container", 4, "ngIf"], ["class", "no-badges", 4, "ngIf"], [1, "achievement-summary"], [1, "summary-grid"], [1, "summary-item"], [1, "summary-icon"], [1, "summary-info"], [1, "summary-label"], [1, "summary-value"], [1, "motivational-message"], [1, "badges-container"], ["class", "badge-item", 4, "ngFor", "ngForOf"], [1, "badge-item"], [1, "badge-icon"], [1, "badge-name"], [1, "no-badges"]],
    template: function RewardsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "\uD83C\uDFC5 My Rewards");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function RewardsComponent_Template_button_click_4_listener() {
          return ctx.goHome();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "\u2190 Home");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, RewardsComponent_div_6_Template, 5, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, RewardsComponent_div_7_Template, 10, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, RewardsComponent_div_8_Template, 65, 12, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.error && !ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.rewards && !ctx.isLoading);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf],
    styles: [".rewards-container[_ngcontent-%COMP%] {\n  max-width: 1000px;\n  margin: 0 auto;\n  padding: 20px;\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);\n  min-height: 100vh;\n}\n\n.header[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.95);\n  color: #333;\n  padding: 30px;\n  border-radius: 12px;\n  margin-bottom: 30px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 2.5em;\n  font-weight: 600;\n}\n\n.btn-back[_ngcontent-%COMP%] {\n  padding: 12px 25px;\n  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n\n.btn-back[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n}\n\n.loading-section[_ngcontent-%COMP%], .error-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 400px;\n}\n\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  background: white;\n  padding: 40px;\n  border-radius: 12px;\n}\n\n.spinner[_ngcontent-%COMP%] {\n  border: 5px solid #f3f3f3;\n  border-top: 5px solid #fa709a;\n  border-radius: 50%;\n  width: 60px;\n  height: 60px;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto 30px;\n}\n\n@keyframes _ngcontent-%COMP%_spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n.error-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 40px;\n  text-align: center;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n.error-icon[_ngcontent-%COMP%] {\n  font-size: 60px;\n  margin-bottom: 20px;\n}\n\n.btn-retry[_ngcontent-%COMP%] {\n  padding: 12px 30px;\n  background: #c33;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  margin-top: 20px;\n}\n\n.rewards-content[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.5s ease-in;\n}\n\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.reward-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 20px;\n  padding: 40px;\n  margin-bottom: 25px;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);\n  display: flex;\n  align-items: center;\n  gap: 30px;\n  transition: transform 0.3s;\n}\n\n.reward-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n}\n\n.card-icon[_ngcontent-%COMP%] {\n  font-size: 80px;\n  flex-shrink: 0;\n}\n\n.card-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.card-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #333;\n  margin: 0 0 20px 0;\n  font-size: 1.8em;\n}\n\n.points-display[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 10px;\n}\n\n.points-value[_ngcontent-%COMP%] {\n  font-size: 4em;\n  font-weight: bold;\n  color: #fa709a;\n}\n\n.points-label[_ngcontent-%COMP%] {\n  font-size: 1.5em;\n  color: #666;\n}\n\n.level-display[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.level-value[_ngcontent-%COMP%] {\n  font-size: 3em;\n  font-weight: bold;\n  color: #fee140;\n  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.progress-bar-container[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n\n.progress-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 30px;\n  background: #e9ecef;\n  border-radius: 15px;\n  overflow: hidden;\n  margin-bottom: 10px;\n}\n\n.progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);\n  border-radius: 15px;\n  transition: width 0.5s ease;\n}\n\n.progress-text[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #666;\n  font-size: 14px;\n}\n\n.badges-container[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 20px;\n  margin-top: 20px;\n}\n\n.badge-item[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #fff4e6 0%, #ffe6cc 100%);\n  border: 2px solid #ffd9b3;\n  border-radius: 15px;\n  padding: 20px;\n  text-align: center;\n  transition: transform 0.3s;\n}\n\n.badge-item[_ngcontent-%COMP%]:hover {\n  transform: scale(1.05);\n}\n\n.badge-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  margin-bottom: 10px;\n}\n\n.badge-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #cc6600;\n  font-size: 16px;\n}\n\n.no-badges[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #666;\n  font-size: 16px;\n}\n\n.achievement-summary[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 20px;\n  padding: 40px;\n  margin-bottom: 25px;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);\n}\n\n.achievement-summary[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #333;\n  margin: 0 0 30px 0;\n  font-size: 1.8em;\n  text-align: center;\n}\n\n.summary-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 25px;\n}\n\n.summary-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  padding: 25px;\n  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);\n  border-radius: 15px;\n  border-left: 4px solid #fa709a;\n}\n\n.summary-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n}\n\n.summary-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n\n.summary-label[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 14px;\n  font-weight: 500;\n}\n\n.summary-value[_ngcontent-%COMP%] {\n  color: #333;\n  font-size: 24px;\n  font-weight: bold;\n}\n\n.motivational-message[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 20px;\n  padding: 30px;\n  text-align: center;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);\n}\n\n.motivational-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #333;\n  margin: 0;\n  font-weight: 500;\n}\n\n@media (max-width: 768px) {\n  .rewards-container[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  \n  .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 15px;\n  }\n  \n  .reward-card[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n  }\n  \n  .card-icon[_ngcontent-%COMP%] {\n    font-size: 60px;\n  }\n  \n  .points-value[_ngcontent-%COMP%] {\n    font-size: 3em;\n  }\n  \n  .level-value[_ngcontent-%COMP%] {\n    font-size: 2em;\n  }\n  \n  .badges-container[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  \n  .summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9yZXdhcmRzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBaUI7RUFDakIsY0FBYztFQUNkLGFBQWE7RUFDYiw0REFBNEQ7RUFDNUQsNkRBQTZEO0VBQzdELGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLHFDQUFxQztFQUNyQyxXQUFXO0VBQ1gsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsd0NBQXdDO0VBQ3hDLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsU0FBUztFQUNULGdCQUFnQjtFQUNoQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsNkRBQTZEO0VBQzdELFlBQVk7RUFDWixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2Ysb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsMkJBQTJCO0VBQzNCLHdDQUF3QztBQUMxQzs7QUFFQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsYUFBYTtFQUNiLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6Qiw2QkFBNkI7RUFDN0Isa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0NBQWtDO0VBQ2xDLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLEtBQUssdUJBQXVCLEVBQUU7RUFDOUIsT0FBTyx5QkFBeUIsRUFBRTtBQUNwQzs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQix3Q0FBd0M7QUFDMUM7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGdC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RSxzQkFBc0I7SUFDdEIsa0JBQWtCO0VBQ3BCOztFQUVBO0lBQ0UsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLGNBQWM7RUFDaEI7O0VBRUE7SUFDRSxjQUFjO0VBQ2hCOztFQUVBO0lBQ0UsMEJBQTBCO0VBQzVCOztFQUVBO0lBQ0UsMEJBQTBCO0VBQzVCO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIucmV3YXJkcy1jb250YWluZXIge1xuICBtYXgtd2lkdGg6IDEwMDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIHBhZGRpbmc6IDIwcHg7XG4gIGZvbnQtZmFtaWx5OiAnU2Vnb2UgVUknLCBUYWhvbWEsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZjtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZhNzA5YSAwJSwgI2ZlZTE0MCAxMDAlKTtcbiAgbWluLWhlaWdodDogMTAwdmg7XG59XG5cbi5oZWFkZXIge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOTUpO1xuICBjb2xvcjogIzMzMztcbiAgcGFkZGluZzogMzBweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcbiAgYm94LXNoYWRvdzogMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uaGVhZGVyIGgxIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDIuNWVtO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uYnRuLWJhY2sge1xuICBwYWRkaW5nOiAxMnB4IDI1cHg7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmYTcwOWEgMCUsICNmZWUxNDAgMTAwJSk7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3M7XG59XG5cbi5idG4tYmFjazpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgYm94LXNoYWRvdzogMCA0cHggOHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbn1cblxuLmxvYWRpbmctc2VjdGlvbiwgLmVycm9yLXNlY3Rpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWluLWhlaWdodDogNDAwcHg7XG59XG5cbi5sb2FkaW5nIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgcGFkZGluZzogNDBweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbn1cblxuLnNwaW5uZXIge1xuICBib3JkZXI6IDVweCBzb2xpZCAjZjNmM2YzO1xuICBib3JkZXItdG9wOiA1cHggc29saWQgI2ZhNzA5YTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICB3aWR0aDogNjBweDtcbiAgaGVpZ2h0OiA2MHB4O1xuICBhbmltYXRpb246IHNwaW4gMXMgbGluZWFyIGluZmluaXRlO1xuICBtYXJnaW46IDAgYXV0byAzMHB4O1xufVxuXG5Aa2V5ZnJhbWVzIHNwaW4ge1xuICAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XG59XG5cbi5lcnJvci1jYXJkIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHBhZGRpbmc6IDQwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuLmVycm9yLWljb24ge1xuICBmb250LXNpemU6IDYwcHg7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5cbi5idG4tcmV0cnkge1xuICBwYWRkaW5nOiAxMnB4IDMwcHg7XG4gIGJhY2tncm91bmQ6ICNjMzM7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgbWFyZ2luLXRvcDogMjBweDtcbn1cblxuLnJld2FyZHMtY29udGVudCB7XG4gIGFuaW1hdGlvbjogZmFkZUluIDAuNXMgZWFzZS1pbjtcbn1cblxuQGtleWZyYW1lcyBmYWRlSW4ge1xuICBmcm9tIHsgb3BhY2l0eTogMDsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpOyB9XG4gIHRvIHsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9XG59XG5cbi5yZXdhcmQtY2FyZCB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICBwYWRkaW5nOiA0MHB4O1xuICBtYXJnaW4tYm90dG9tOiAyNXB4O1xuICBib3gtc2hhZG93OiAwIDhweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMzBweDtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3M7XG59XG5cbi5yZXdhcmQtY2FyZDpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KTtcbn1cblxuLmNhcmQtaWNvbiB7XG4gIGZvbnQtc2l6ZTogODBweDtcbiAgZmxleC1zaHJpbms6IDA7XG59XG5cbi5jYXJkLWNvbnRlbnQge1xuICBmbGV4OiAxO1xufVxuXG4uY2FyZC1jb250ZW50IGgyIHtcbiAgY29sb3I6ICMzMzM7XG4gIG1hcmdpbjogMCAwIDIwcHggMDtcbiAgZm9udC1zaXplOiAxLjhlbTtcbn1cblxuLnBvaW50cy1kaXNwbGF5IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xuICBnYXA6IDEwcHg7XG59XG5cbi5wb2ludHMtdmFsdWUge1xuICBmb250LXNpemU6IDRlbTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGNvbG9yOiAjZmE3MDlhO1xufVxuXG4ucG9pbnRzLWxhYmVsIHtcbiAgZm9udC1zaXplOiAxLjVlbTtcbiAgY29sb3I6ICM2NjY7XG59XG5cbi5sZXZlbC1kaXNwbGF5IHtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxuLmxldmVsLXZhbHVlIHtcbiAgZm9udC1zaXplOiAzZW07XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogI2ZlZTE0MDtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZhNzA5YSAwJSwgI2ZlZTE0MCAxMDAlKTtcbiAgLXdlYmtpdC1iYWNrZ3JvdW5kLWNsaXA6IHRleHQ7XG4gIC13ZWJraXQtdGV4dC1maWxsLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYmFja2dyb3VuZC1jbGlwOiB0ZXh0O1xufVxuXG4ucHJvZ3Jlc3MtYmFyLWNvbnRhaW5lciB7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG59XG5cbi5wcm9ncmVzcy1iYXIge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAzMHB4O1xuICBiYWNrZ3JvdW5kOiAjZTllY2VmO1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4ucHJvZ3Jlc3MtZmlsbCB7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZhNzA5YSAwJSwgI2ZlZTE0MCAxMDAlKTtcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcbiAgdHJhbnNpdGlvbjogd2lkdGggMC41cyBlYXNlO1xufVxuXG4ucHJvZ3Jlc3MtdGV4dCB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6ICM2NjY7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLmJhZGdlcy1jb250YWluZXIge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpbGwsIG1pbm1heCgyMDBweCwgMWZyKSk7XG4gIGdhcDogMjBweDtcbiAgbWFyZ2luLXRvcDogMjBweDtcbn1cblxuLmJhZGdlLWl0ZW0ge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZmZmNGU2IDAlLCAjZmZlNmNjIDEwMCUpO1xuICBib3JkZXI6IDJweCBzb2xpZCAjZmZkOWIzO1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBwYWRkaW5nOiAyMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzO1xufVxuXG4uYmFkZ2UtaXRlbTpob3ZlciB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMS4wNSk7XG59XG5cbi5iYWRnZS1pY29uIHtcbiAgZm9udC1zaXplOiA0MHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4uYmFkZ2UtbmFtZSB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjY2M2NjAwO1xuICBmb250LXNpemU6IDE2cHg7XG59XG5cbi5uby1iYWRnZXMge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDQwcHg7XG4gIGNvbG9yOiAjNjY2O1xuICBmb250LXNpemU6IDE2cHg7XG59XG5cbi5hY2hpZXZlbWVudC1zdW1tYXJ5IHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIHBhZGRpbmc6IDQwcHg7XG4gIG1hcmdpbi1ib3R0b206IDI1cHg7XG4gIGJveC1zaGFkb3c6IDAgOHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcbn1cblxuLmFjaGlldmVtZW50LXN1bW1hcnkgaDMge1xuICBjb2xvcjogIzMzMztcbiAgbWFyZ2luOiAwIDAgMzBweCAwO1xuICBmb250LXNpemU6IDEuOGVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5zdW1tYXJ5LWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDI1MHB4LCAxZnIpKTtcbiAgZ2FwOiAyNXB4O1xufVxuXG4uc3VtbWFyeS1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAyMHB4O1xuICBwYWRkaW5nOiAyNXB4O1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZjhmOWZhIDAlLCAjZTllY2VmIDEwMCUpO1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBib3JkZXItbGVmdDogNHB4IHNvbGlkICNmYTcwOWE7XG59XG5cbi5zdW1tYXJ5LWljb24ge1xuICBmb250LXNpemU6IDQwcHg7XG59XG5cbi5zdW1tYXJ5LWluZm8ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDVweDtcbn1cblxuLnN1bW1hcnktbGFiZWwge1xuICBjb2xvcjogIzY2NjtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG4uc3VtbWFyeS12YWx1ZSB7XG4gIGNvbG9yOiAjMzMzO1xuICBmb250LXNpemU6IDI0cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4ubW90aXZhdGlvbmFsLW1lc3NhZ2Uge1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcbiAgcGFkZGluZzogMzBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBib3gtc2hhZG93OiAwIDhweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG5cbi5tb3RpdmF0aW9uYWwtbWVzc2FnZSBwIHtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBjb2xvcjogIzMzMztcbiAgbWFyZ2luOiAwO1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLnJld2FyZHMtY29udGFpbmVyIHtcbiAgICBwYWRkaW5nOiAxMHB4O1xuICB9XG4gIFxuICAuaGVhZGVyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGdhcDogMTVweDtcbiAgfVxuICBcbiAgLnJld2FyZC1jYXJkIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuICBcbiAgLmNhcmQtaWNvbiB7XG4gICAgZm9udC1zaXplOiA2MHB4O1xuICB9XG4gIFxuICAucG9pbnRzLXZhbHVlIHtcbiAgICBmb250LXNpemU6IDNlbTtcbiAgfVxuICBcbiAgLmxldmVsLXZhbHVlIHtcbiAgICBmb250LXNpemU6IDJlbTtcbiAgfVxuICBcbiAgLmJhZGdlcy1jb250YWluZXIge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG4gIFxuICAuc3VtbWFyeS1ncmlkIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgfVxufVxuXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 1787:
/*!**********************************************************!*\
  !*** ./src/app/components/story-generation.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StoryGenerationComponent": () => (/* binding */ StoryGenerationComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _services_user_profile_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/user-profile.service */ 9618);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4666);




function StoryGenerationComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 7)(1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Loading Your Story...");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "We're preparing your personalized story!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
}
function StoryGenerationComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 10)(1, "div", 11)(2, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "\u274C");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Story Generation Failed");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function StoryGenerationComponent_div_7_Template_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r4.generateStory());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Retry");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.error);
  }
}
function StoryGenerationComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 14)(1, "p")(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Story Debug Info:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("isLoading: ", ctx_r2.isLoading, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("showStory: ", ctx_r2.showStory, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("currentStory exists: ", !!ctx_r2.currentStory, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("currentStory title: ", ctx_r2.currentStory == null ? null : ctx_r2.currentStory.title, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("error: ", ctx_r2.error, "");
  }
}
function StoryGenerationComponent_div_9_div_11_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function StoryGenerationComponent_div_9_div_11_button_2_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r15);
      const i_r13 = restoredCtx.index;
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r14.goToPanel(i_r13));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const i_r13 = ctx.index;
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", i_r13 === ctx_r11.currentPanelIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", i_r13 + 1, " ");
  }
}
function StoryGenerationComponent_div_9_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 35)(1, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, StoryGenerationComponent_div_9_div_11_button_2_Template, 2, 3, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 38)(4, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function StoryGenerationComponent_div_9_div_11_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r17);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r16.previousPanel());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, " \u2190 Previous ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function StoryGenerationComponent_div_9_div_11_Template_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r17);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r18.nextPanel());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, " Next \u2192 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r6.currentStory.panels);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx_r6.currentPanelIndex === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"](" Panel ", ctx_r6.currentPanelIndex + 1, " of ", ctx_r6.currentStory.panels.length, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx_r6.currentPanelIndex === ctx_r6.currentStory.panels.length - 1);
  }
}
function StoryGenerationComponent_div_9_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 42)(1, "div", 43)(2, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 45)(5, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "p", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r7.currentPanelIndex + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Panel ", ctx_r7.currentPanelIndex + 1, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r7.currentStory.panels[ctx_r7.currentPanelIndex].text);
  }
}
function StoryGenerationComponent_div_9_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function StoryGenerationComponent_div_9_div_17_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r22);
      const i_r20 = restoredCtx.index;
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r21.goToPanel(i_r20));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "p", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const panel_r19 = ctx.$implicit;
    const i_r20 = ctx.index;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", i_r20 === ctx_r8.currentPanelIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](panel_r19.panelId);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](panel_r19.text);
  }
}
function StoryGenerationComponent_div_9_div_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 50)(1, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const point_r23 = ctx.$implicit;
    const i_r24 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](i_r24 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](point_r23);
  }
}
function StoryGenerationComponent_div_9_div_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 53)(1, "div", 54)(2, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "\uD83D\uDCA1 Next Recommended Concept");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r10.currentStory.nextRecommendedConcept);
  }
}
function StoryGenerationComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 15)(1, "div", 16)(2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 17)(5, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, StoryGenerationComponent_div_9_div_11_Template, 10, 5, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, StoryGenerationComponent_div_9_div_12_Template, 9, 3, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 23)(14, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "\uD83D\uDCD6 Complete Story");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, StoryGenerationComponent_div_9_div_17_Template, 5, 4, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "div", 26)(19, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, "\uD83D\uDCDD Full Story Text");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "div", 27)(22, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "div", 28)(25, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "\uD83C\uDFAF Key Learning Points");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](28, StoryGenerationComponent_div_9_div_28_Template, 5, 2, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](29, StoryGenerationComponent_div_9_div_29_Template, 6, 1, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "div", 32)(31, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function StoryGenerationComponent_div_9_Template_button_click_31_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r26);
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r25.onStartQuiz());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](32, " \u2705 Start Quiz ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function StoryGenerationComponent_div_9_Template_button_click_33_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r26);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r27.generateStory());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34, " \uD83D\uDD04 Generate New Story ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r3.currentStory.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r3.currentStory.concept);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r3.currentStory.difficulty);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r3.currentStory.theme);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.currentStory.panels.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.currentStory.panels[ctx_r3.currentPanelIndex]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r3.currentStory.panels);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r3.currentStory.fullStoryText);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r3.currentStory.learningPoints);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.currentStory.nextRecommendedConcept);
  }
}
class StoryGenerationComponent {
  userProfileService;
  cdr;
  backToProfile = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
  profile = null;
  currentStory = null;
  isLoading = false;
  error = null;
  showStory = false;
  currentPanelIndex = 0;
  constructor(userProfileService, cdr) {
    this.userProfileService = userProfileService;
    this.cdr = cdr;
  }
  ngOnInit() {
    console.log('Story component initialized');
    // Get profile and story from service (set by home component)
    this.profile = this.userProfileService.currentProfile;
    this.currentStory = this.userProfileService.currentStory;
    console.log('Profile from service:', this.profile);
    console.log('Story from service:', this.currentStory);
    if (this.currentStory && this.currentStory.title) {
      // Story already loaded from API, just display it
      console.log('Using existing story from service');
      console.log('Story title:', this.currentStory.title);
      console.log('Story panels:', this.currentStory.panels?.length);
      this.showStory = true;
      this.isLoading = false;
      this.error = null;
      this.cdr.detectChanges();
      console.log('Story displayed:', this.currentStory);
      return;
    } else if (this.profile) {
      // Profile exists but no story, try to get it from startLearningJourney
      console.log('Profile exists but no story. Fetching story...');
      this.isLoading = true;
      this.userProfileService.startLearningJourney(this.profile.childId || 'kid_001').subscribe({
        next: response => {
          console.log('Story fetch response:', response);
          if (response.success && response.story) {
            this.currentStory = response.story;
            this.userProfileService.currentStory = response.story;
            this.showStory = true;
            this.isLoading = false;
            this.error = null;
            this.cdr.detectChanges();
            console.log('Story loaded and displayed:', this.currentStory);
          } else {
            this.error = 'Failed to load story';
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        },
        error: error => {
          console.error('Failed to fetch story:', error);
          this.error = error.error?.detail || 'Failed to load story';
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      console.error('No profile or story available');
      this.error = 'No profile or story available. Please start from the home screen.';
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
  generateStory() {
    if (!this.profile) {
      this.error = 'No profile available';
      return;
    }
    this.isLoading = true;
    this.error = null;
    this.showStory = false;
    this.currentStory = null;
    this.currentPanelIndex = 0;
    this.userProfileService.generateStory(this.profile).subscribe({
      next: response => {
        this.currentStory = response.story;
        this.isLoading = false;
        this.showStory = true;
      },
      error: error => {
        this.error = error.error?.detail || 'Failed to generate story';
        this.isLoading = false;
        console.error('Story generation error:', error);
      }
    });
  }
  nextPanel() {
    if (this.currentStory && this.currentPanelIndex < this.currentStory.panels.length - 1) {
      this.currentPanelIndex++;
    }
  }
  previousPanel() {
    if (this.currentPanelIndex > 0) {
      this.currentPanelIndex--;
    }
  }
  goToPanel(index) {
    if (this.currentStory && index >= 0 && index < this.currentStory.panels.length) {
      this.currentPanelIndex = index;
    }
  }
  onStartQuiz() {
    // Store story in service and navigate to quiz
    if (this.currentStory) {
      this.userProfileService.currentStory = this.currentStory;
      if (this.userProfileService) {
        this.userProfileService.navigateToQuiz?.();
      }
    }
  }
  goBackToProfile() {
    this.backToProfile.emit();
  }
  static ɵfac = function StoryGenerationComponent_Factory(t) {
    return new (t || StoryGenerationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_user_profile_service__WEBPACK_IMPORTED_MODULE_0__.UserProfileService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: StoryGenerationComponent,
    selectors: [["app-story-generation"]],
    outputs: {
      backToProfile: "backToProfile"
    },
    decls: 10,
    vars: 4,
    consts: [[1, "story-generation-container"], [1, "header"], [1, "btn-back", 3, "click"], ["class", "loading-section", 4, "ngIf"], ["class", "error-section", 4, "ngIf"], ["style", "background: yellow; padding: 10px; margin: 10px; border-radius: 5px;", 4, "ngIf"], ["class", "story-section", 4, "ngIf"], [1, "loading-section"], [1, "loading"], [1, "spinner"], [1, "error-section"], [1, "error-card"], [1, "error-icon"], [1, "btn-retry", 3, "click"], [2, "background", "yellow", "padding", "10px", "margin", "10px", "border-radius", "5px"], [1, "story-section"], [1, "story-header"], [1, "story-meta"], [1, "badge", "concept-badge"], [1, "badge", "difficulty-badge"], [1, "badge", "theme-badge"], ["class", "panels-navigation", 4, "ngIf"], ["class", "panel-display", 4, "ngIf"], [1, "all-panels-section"], [1, "panels-grid"], ["class", "panel-mini-card", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "full-story-section"], [1, "full-story-text"], [1, "learning-points-section"], [1, "learning-points-list"], ["class", "learning-point-item", 4, "ngFor", "ngForOf"], ["class", "next-concept-section", 4, "ngIf"], [1, "action-section"], [1, "btn-primary", "btn-large", 3, "click"], [1, "btn-secondary", 3, "click"], [1, "panels-navigation"], [1, "panel-indicators"], ["class", "panel-indicator", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "panel-controls"], [1, "btn-nav", 3, "disabled", "click"], [1, "panel-counter"], [1, "panel-indicator", 3, "click"], [1, "panel-display"], [1, "panel-card"], [1, "panel-number-large"], [1, "panel-content"], [1, "panel-text"], [1, "panel-mini-card", 3, "click"], [1, "panel-mini-number"], [1, "panel-mini-text"], [1, "learning-point-item"], [1, "point-number"], [1, "point-text"], [1, "next-concept-section"], [1, "next-concept-card"]],
    template: function StoryGenerationComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "\uD83D\uDCDA Story Generation");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function StoryGenerationComponent_Template_button_click_4_listener() {
          return ctx.goBackToProfile();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "\u2190 Back to Profile");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, StoryGenerationComponent_div_6_Template, 7, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, StoryGenerationComponent_div_7_Template, 10, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, StoryGenerationComponent_div_8_Template, 14, 5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, StoryGenerationComponent_div_9_Template, 35, 10, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoading && !ctx.currentStory);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.error && !ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showStory && ctx.currentStory && ctx.currentStory.title);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf],
    styles: [".story-generation-container[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: 20px;\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n  background: #f5f7fa;\n  min-height: 100vh;\n}\n\n.header[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);\n  color: white;\n  padding: 30px;\n  border-radius: 12px;\n  margin-bottom: 30px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 2.5em;\n  font-weight: 600;\n}\n\n.btn-back[_ngcontent-%COMP%] {\n  padding: 12px 25px;\n  background: white;\n  color: #f5576c;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 16px;\n  cursor: pointer;\n  transition: all 0.3s;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n.btn-back[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n}\n\n\n.loading-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 500px;\n}\n\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n}\n\n.spinner[_ngcontent-%COMP%] {\n  border: 5px solid #f3f3f3;\n  border-top: 5px solid #f5576c;\n  border-radius: 50%;\n  width: 60px;\n  height: 60px;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto 30px;\n}\n\n@keyframes _ngcontent-%COMP%_spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n.loading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #333;\n  margin-bottom: 10px;\n}\n\n.loading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 16px;\n}\n\n\n.error-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 400px;\n}\n\n.error-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 40px;\n  text-align: center;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  max-width: 500px;\n}\n\n.error-icon[_ngcontent-%COMP%] {\n  font-size: 60px;\n  margin-bottom: 20px;\n}\n\n.error-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #c33;\n  margin-bottom: 15px;\n}\n\n.error-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  margin-bottom: 25px;\n  font-size: 16px;\n}\n\n.btn-retry[_ngcontent-%COMP%] {\n  padding: 12px 30px;\n  background: #c33;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n\n.btn-retry[_ngcontent-%COMP%]:hover {\n  background: #a22;\n  transform: translateY(-2px);\n}\n\n\n.story-section[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.5s ease-in;\n}\n\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.story-header[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 30px;\n  margin-bottom: 25px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  text-align: center;\n}\n\n.story-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #333;\n  margin: 0 0 20px 0;\n  font-size: 2.2em;\n}\n\n.story-meta[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 15px;\n  flex-wrap: wrap;\n}\n\n.badge[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border-radius: 25px;\n  font-weight: 600;\n  font-size: 14px;\n}\n\n.concept-badge[_ngcontent-%COMP%] {\n  background: #e7f3ff;\n  color: #0066cc;\n  border: 2px solid #b3d9ff;\n}\n\n.difficulty-badge[_ngcontent-%COMP%] {\n  background: #fff4e6;\n  color: #cc6600;\n  border: 2px solid #ffd9b3;\n}\n\n.theme-badge[_ngcontent-%COMP%] {\n  background: #f0e6ff;\n  color: #6600cc;\n  border: 2px solid #d9b3ff;\n}\n\n\n.panels-navigation[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 25px;\n  margin-bottom: 25px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n.panel-indicators[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 10px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n\n.panel-indicator[_ngcontent-%COMP%] {\n  width: 45px;\n  height: 45px;\n  border-radius: 50%;\n  border: 2px solid #dee2e6;\n  background: white;\n  color: #666;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n\n.panel-indicator[_ngcontent-%COMP%]:hover {\n  border-color: #f5576c;\n  background: #fff0f3;\n}\n\n.panel-indicator.active[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);\n  border-color: #f5576c;\n  color: white;\n}\n\n.panel-controls[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n}\n\n.btn-nav[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background: #f8f9fa;\n  border: 2px solid #dee2e6;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n\n.btn-nav[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #e9ecef;\n  border-color: #f5576c;\n  color: #f5576c;\n}\n\n.btn-nav[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.panel-counter[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #666;\n  font-size: 16px;\n}\n\n\n.panel-display[_ngcontent-%COMP%] {\n  margin-bottom: 30px;\n}\n\n.panel-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 40px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  display: flex;\n  gap: 30px;\n  align-items: flex-start;\n}\n\n.panel-number-large[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 36px;\n  font-weight: bold;\n  flex-shrink: 0;\n  box-shadow: 0 4px 8px rgba(245, 87, 108, 0.3);\n}\n\n.panel-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.panel-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #333;\n  margin: 0 0 15px 0;\n  font-size: 24px;\n}\n\n.panel-text[_ngcontent-%COMP%] {\n  color: #555;\n  line-height: 1.8;\n  font-size: 18px;\n  margin: 0;\n}\n\n\n.all-panels-section[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 30px;\n  margin-bottom: 25px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n.all-panels-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #333;\n  margin: 0 0 20px 0;\n  font-size: 1.8em;\n}\n\n.panels-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 20px;\n}\n\n.panel-mini-card[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border: 2px solid #dee2e6;\n  border-radius: 8px;\n  padding: 20px;\n  cursor: pointer;\n  transition: all 0.3s;\n  position: relative;\n}\n\n.panel-mini-card[_ngcontent-%COMP%]:hover {\n  border-color: #f5576c;\n  background: #fff0f3;\n  transform: translateY(-3px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n}\n\n.panel-mini-card.active[_ngcontent-%COMP%] {\n  border-color: #f5576c;\n  background: linear-gradient(135deg, #fff0f3 0%, #ffe6ea 100%);\n  box-shadow: 0 4px 12px rgba(245, 87, 108, 0.2);\n}\n\n.panel-mini-number[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -12px;\n  left: 20px;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: bold;\n  font-size: 14px;\n}\n\n.panel-mini-text[_ngcontent-%COMP%] {\n  margin-top: 15px;\n  color: #555;\n  line-height: 1.6;\n  font-size: 14px;\n}\n\n\n.full-story-section[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 30px;\n  margin-bottom: 25px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n.full-story-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #333;\n  margin: 0 0 20px 0;\n  font-size: 1.8em;\n}\n\n.full-story-text[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border-left: 4px solid #f5576c;\n  padding: 25px;\n  border-radius: 8px;\n}\n\n.full-story-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #444;\n  line-height: 1.9;\n  font-size: 16px;\n  margin: 0;\n  white-space: pre-wrap;\n}\n\n\n.learning-points-section[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 30px;\n  margin-bottom: 25px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n.learning-points-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #333;\n  margin: 0 0 25px 0;\n  font-size: 1.8em;\n}\n\n.learning-points-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\n.learning-point-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  align-items: flex-start;\n  padding: 20px;\n  background: #f0f8ff;\n  border-radius: 8px;\n  border-left: 4px solid #0066cc;\n}\n\n.point-number[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #0066cc 0%, #004499 100%);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: bold;\n  flex-shrink: 0;\n}\n\n.point-text[_ngcontent-%COMP%] {\n  flex: 1;\n  color: #333;\n  line-height: 1.7;\n  font-size: 16px;\n  margin: 0;\n}\n\n\n.next-concept-section[_ngcontent-%COMP%] {\n  margin-bottom: 25px;\n}\n\n.next-concept-card[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #fff4e6 0%, #ffe6cc 100%);\n  border: 2px solid #ffd9b3;\n  border-radius: 12px;\n  padding: 25px;\n  text-align: center;\n}\n\n.next-concept-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  color: #cc6600;\n  margin: 0 0 10px 0;\n  font-size: 20px;\n}\n\n.next-concept-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #995500;\n  font-size: 18px;\n  font-weight: 600;\n  margin: 0;\n}\n\n\n.action-section[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 40px;\n  padding-top: 30px;\n  border-top: 2px solid #e9ecef;\n  display: flex;\n  gap: 20px;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  padding: 18px 40px;\n  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);\n  color: white;\n  border: none;\n  border-radius: 10px;\n  font-size: 18px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s;\n  box-shadow: 0 4px 12px rgba(245, 87, 108, 0.3);\n}\n\n.btn-primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 6px 20px rgba(245, 87, 108, 0.4);\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  padding: 18px 40px;\n  background: #6c757d;\n  color: white;\n  border: none;\n  border-radius: 10px;\n  font-size: 18px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #5a6268;\n  transform: translateY(-3px);\n}\n\n.btn-large[_ngcontent-%COMP%] {\n  font-size: 20px;\n  padding: 20px 50px;\n}\n\n\n@media (max-width: 768px) {\n  .story-generation-container[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  \n  .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 15px;\n    text-align: center;\n  }\n  \n  .header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.8em;\n  }\n  \n  .panel-card[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n  }\n  \n  .panels-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  \n  .action-section[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  \n  .btn-primary[_ngcontent-%COMP%], .btn-secondary[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9zdG9yeS1nZW5lcmF0aW9uLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBaUI7RUFDakIsY0FBYztFQUNkLGFBQWE7RUFDYiw0REFBNEQ7RUFDNUQsbUJBQW1CO0VBQ25CLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLDZEQUE2RDtFQUM3RCxZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsd0NBQXdDO0VBQ3hDLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsU0FBUztFQUNULGdCQUFnQjtFQUNoQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsZUFBZTtFQUNmLG9CQUFvQjtFQUNwQix3Q0FBd0M7QUFDMUM7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0Isd0NBQXdDO0FBQzFDOztBQUVBLG9CQUFvQjtBQUNwQjtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsNkJBQTZCO0VBQzdCLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsWUFBWTtFQUNaLGtDQUFrQztFQUNsQyxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxLQUFLLHVCQUF1QixFQUFFO0VBQzlCLE9BQU8seUJBQXlCLEVBQUU7QUFDcEM7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGVBQWU7QUFDakI7O0FBRUEsa0JBQWtCO0FBQ2xCO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2Qixt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QVk7RUFDWixZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLG9CQUFvQjtFQUNwQiw4Q0FBOEM7QUFDaEQ7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0IsOENBQThDO0FBQ2hEOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGtCQUFrQjtBQUNwQjs7QUFFQSxzQkFBc0I7QUFDdEI7RUFDRTtJQUNFLGFBQWE7RUFDZjs7RUFFQTtJQUNFLHNCQUFzQjtJQUN0QixTQUFTO0lBQ1Qsa0JBQWtCO0VBQ3BCOztFQUVBO0lBQ0UsZ0JBQWdCO0VBQ2xCOztFQUVBO0lBQ0Usc0JBQXNCO0lBQ3RCLGtCQUFrQjtFQUNwQjs7RUFFQTtJQUNFLDBCQUEwQjtFQUM1Qjs7RUFFQTtJQUNFLHNCQUFzQjtFQUN4Qjs7RUFFQTtJQUNFLFdBQVc7RUFDYjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLnN0b3J5LWdlbmVyYXRpb24tY29udGFpbmVyIHtcbiAgbWF4LXdpZHRoOiAxNDAwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBwYWRkaW5nOiAyMHB4O1xuICBmb250LWZhbWlseTogJ1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7XG4gIGJhY2tncm91bmQ6ICNmNWY3ZmE7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xufVxuXG4uaGVhZGVyIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2YwOTNmYiAwJSwgI2Y1NTc2YyAxMDAlKTtcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiAzMHB4O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xuICBib3gtc2hhZG93OiAwIDRweCA2cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5oZWFkZXIgaDEge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMi41ZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5idG4tYmFjayB7XG4gIHBhZGRpbmc6IDEycHggMjVweDtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGNvbG9yOiAjZjU1NzZjO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzO1xuICBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4uYnRuLWJhY2s6aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMik7XG59XG5cbi8qIExvYWRpbmcgU2VjdGlvbiAqL1xuLmxvYWRpbmctc2VjdGlvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtaW4taGVpZ2h0OiA1MDBweDtcbn1cblxuLmxvYWRpbmcge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDQwcHg7XG59XG5cbi5zcGlubmVyIHtcbiAgYm9yZGVyOiA1cHggc29saWQgI2YzZjNmMztcbiAgYm9yZGVyLXRvcDogNXB4IHNvbGlkICNmNTU3NmM7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgd2lkdGg6IDYwcHg7XG4gIGhlaWdodDogNjBweDtcbiAgYW5pbWF0aW9uOiBzcGluIDFzIGxpbmVhciBpbmZpbml0ZTtcbiAgbWFyZ2luOiAwIGF1dG8gMzBweDtcbn1cblxuQGtleWZyYW1lcyBzcGluIHtcbiAgMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxufVxuXG4ubG9hZGluZyBoMiB7XG4gIGNvbG9yOiAjMzMzO1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4ubG9hZGluZyBwIHtcbiAgY29sb3I6ICM2NjY7XG4gIGZvbnQtc2l6ZTogMTZweDtcbn1cblxuLyogRXJyb3IgU2VjdGlvbiAqL1xuLmVycm9yLXNlY3Rpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWluLWhlaWdodDogNDAwcHg7XG59XG5cbi5lcnJvci1jYXJkIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHBhZGRpbmc6IDQwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgbWF4LXdpZHRoOiA1MDBweDtcbn1cblxuLmVycm9yLWljb24ge1xuICBmb250LXNpemU6IDYwcHg7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5cbi5lcnJvci1jYXJkIGgyIHtcbiAgY29sb3I6ICNjMzM7XG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XG59XG5cbi5lcnJvci1jYXJkIHAge1xuICBjb2xvcjogIzY2NjtcbiAgbWFyZ2luLWJvdHRvbTogMjVweDtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuXG4uYnRuLXJldHJ5IHtcbiAgcGFkZGluZzogMTJweCAzMHB4O1xuICBiYWNrZ3JvdW5kOiAjYzMzO1xuICBjb2xvcjogd2hpdGU7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzO1xufVxuXG4uYnRuLXJldHJ5OmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2EyMjtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xufVxuXG4vKiBTdG9yeSBTZWN0aW9uICovXG4uc3Rvcnktc2VjdGlvbiB7XG4gIGFuaW1hdGlvbjogZmFkZUluIDAuNXMgZWFzZS1pbjtcbn1cblxuQGtleWZyYW1lcyBmYWRlSW4ge1xuICBmcm9tIHsgb3BhY2l0eTogMDsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpOyB9XG4gIHRvIHsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9XG59XG5cbi5zdG9yeS1oZWFkZXIge1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgcGFkZGluZzogMzBweDtcbiAgbWFyZ2luLWJvdHRvbTogMjVweDtcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uc3RvcnktaGVhZGVyIGgyIHtcbiAgY29sb3I6ICMzMzM7XG4gIG1hcmdpbjogMCAwIDIwcHggMDtcbiAgZm9udC1zaXplOiAyLjJlbTtcbn1cblxuLnN0b3J5LW1ldGEge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiAxNXB4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG5cbi5iYWRnZSB7XG4gIHBhZGRpbmc6IDEwcHggMjBweDtcbiAgYm9yZGVyLXJhZGl1czogMjVweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4uY29uY2VwdC1iYWRnZSB7XG4gIGJhY2tncm91bmQ6ICNlN2YzZmY7XG4gIGNvbG9yOiAjMDA2NmNjO1xuICBib3JkZXI6IDJweCBzb2xpZCAjYjNkOWZmO1xufVxuXG4uZGlmZmljdWx0eS1iYWRnZSB7XG4gIGJhY2tncm91bmQ6ICNmZmY0ZTY7XG4gIGNvbG9yOiAjY2M2NjAwO1xuICBib3JkZXI6IDJweCBzb2xpZCAjZmZkOWIzO1xufVxuXG4udGhlbWUtYmFkZ2Uge1xuICBiYWNrZ3JvdW5kOiAjZjBlNmZmO1xuICBjb2xvcjogIzY2MDBjYztcbiAgYm9yZGVyOiAycHggc29saWQgI2Q5YjNmZjtcbn1cblxuLyogUGFuZWxzIE5hdmlnYXRpb24gKi9cbi5wYW5lbHMtbmF2aWdhdGlvbiB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBwYWRkaW5nOiAyNXB4O1xuICBtYXJnaW4tYm90dG9tOiAyNXB4O1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4ucGFuZWwtaW5kaWNhdG9ycyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLnBhbmVsLWluZGljYXRvciB7XG4gIHdpZHRoOiA0NXB4O1xuICBoZWlnaHQ6IDQ1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYm9yZGVyOiAycHggc29saWQgI2RlZTJlNjtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGNvbG9yOiAjNjY2O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzO1xufVxuXG4ucGFuZWwtaW5kaWNhdG9yOmhvdmVyIHtcbiAgYm9yZGVyLWNvbG9yOiAjZjU1NzZjO1xuICBiYWNrZ3JvdW5kOiAjZmZmMGYzO1xufVxuXG4ucGFuZWwtaW5kaWNhdG9yLmFjdGl2ZSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmMDkzZmIgMCUsICNmNTU3NmMgMTAwJSk7XG4gIGJvcmRlci1jb2xvcjogI2Y1NTc2YztcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4ucGFuZWwtY29udHJvbHMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAyMHB4O1xufVxuXG4uYnRuLW5hdiB7XG4gIHBhZGRpbmc6IDEwcHggMjBweDtcbiAgYmFja2dyb3VuZDogI2Y4ZjlmYTtcbiAgYm9yZGVyOiAycHggc29saWQgI2RlZTJlNjtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzO1xufVxuXG4uYnRuLW5hdjpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gIGJhY2tncm91bmQ6ICNlOWVjZWY7XG4gIGJvcmRlci1jb2xvcjogI2Y1NTc2YztcbiAgY29sb3I6ICNmNTU3NmM7XG59XG5cbi5idG4tbmF2OmRpc2FibGVkIHtcbiAgb3BhY2l0eTogMC41O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4ucGFuZWwtY291bnRlciB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjNjY2O1xuICBmb250LXNpemU6IDE2cHg7XG59XG5cbi8qIFBhbmVsIERpc3BsYXkgKi9cbi5wYW5lbC1kaXNwbGF5IHtcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcbn1cblxuLnBhbmVsLWNhcmQge1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgcGFkZGluZzogNDBweDtcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAzMHB4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbn1cblxuLnBhbmVsLW51bWJlci1sYXJnZSB7XG4gIHdpZHRoOiA4MHB4O1xuICBoZWlnaHQ6IDgwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2YwOTNmYiAwJSwgI2Y1NTc2YyAxMDAlKTtcbiAgY29sb3I6IHdoaXRlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAzNnB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZmxleC1zaHJpbms6IDA7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDhweCByZ2JhKDI0NSwgODcsIDEwOCwgMC4zKTtcbn1cblxuLnBhbmVsLWNvbnRlbnQge1xuICBmbGV4OiAxO1xufVxuXG4ucGFuZWwtY29udGVudCBoMyB7XG4gIGNvbG9yOiAjMzMzO1xuICBtYXJnaW46IDAgMCAxNXB4IDA7XG4gIGZvbnQtc2l6ZTogMjRweDtcbn1cblxuLnBhbmVsLXRleHQge1xuICBjb2xvcjogIzU1NTtcbiAgbGluZS1oZWlnaHQ6IDEuODtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBtYXJnaW46IDA7XG59XG5cbi8qIEFsbCBQYW5lbHMgR3JpZCAqL1xuLmFsbC1wYW5lbHMtc2VjdGlvbiB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBwYWRkaW5nOiAzMHB4O1xuICBtYXJnaW4tYm90dG9tOiAyNXB4O1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4uYWxsLXBhbmVscy1zZWN0aW9uIGgzIHtcbiAgY29sb3I6ICMzMzM7XG4gIG1hcmdpbjogMCAwIDIwcHggMDtcbiAgZm9udC1zaXplOiAxLjhlbTtcbn1cblxuLnBhbmVscy1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyODBweCwgMWZyKSk7XG4gIGdhcDogMjBweDtcbn1cblxuLnBhbmVsLW1pbmktY2FyZCB7XG4gIGJhY2tncm91bmQ6ICNmOGY5ZmE7XG4gIGJvcmRlcjogMnB4IHNvbGlkICNkZWUyZTY7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgcGFkZGluZzogMjBweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4ucGFuZWwtbWluaS1jYXJkOmhvdmVyIHtcbiAgYm9yZGVyLWNvbG9yOiAjZjU1NzZjO1xuICBiYWNrZ3JvdW5kOiAjZmZmMGYzO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi5wYW5lbC1taW5pLWNhcmQuYWN0aXZlIHtcbiAgYm9yZGVyLWNvbG9yOiAjZjU1NzZjO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZmZmMGYzIDAlLCAjZmZlNmVhIDEwMCUpO1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMjQ1LCA4NywgMTA4LCAwLjIpO1xufVxuXG4ucGFuZWwtbWluaS1udW1iZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogLTEycHg7XG4gIGxlZnQ6IDIwcHg7XG4gIHdpZHRoOiAzMHB4O1xuICBoZWlnaHQ6IDMwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2YwOTNmYiAwJSwgI2Y1NTc2YyAxMDAlKTtcbiAgY29sb3I6IHdoaXRlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLnBhbmVsLW1pbmktdGV4dCB7XG4gIG1hcmdpbi10b3A6IDE1cHg7XG4gIGNvbG9yOiAjNTU1O1xuICBsaW5lLWhlaWdodDogMS42O1xuICBmb250LXNpemU6IDE0cHg7XG59XG5cbi8qIEZ1bGwgU3RvcnkgU2VjdGlvbiAqL1xuLmZ1bGwtc3Rvcnktc2VjdGlvbiB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBwYWRkaW5nOiAzMHB4O1xuICBtYXJnaW4tYm90dG9tOiAyNXB4O1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4uZnVsbC1zdG9yeS1zZWN0aW9uIGgzIHtcbiAgY29sb3I6ICMzMzM7XG4gIG1hcmdpbjogMCAwIDIwcHggMDtcbiAgZm9udC1zaXplOiAxLjhlbTtcbn1cblxuLmZ1bGwtc3RvcnktdGV4dCB7XG4gIGJhY2tncm91bmQ6ICNmOGY5ZmE7XG4gIGJvcmRlci1sZWZ0OiA0cHggc29saWQgI2Y1NTc2YztcbiAgcGFkZGluZzogMjVweDtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xufVxuXG4uZnVsbC1zdG9yeS10ZXh0IHAge1xuICBjb2xvcjogIzQ0NDtcbiAgbGluZS1oZWlnaHQ6IDEuOTtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBtYXJnaW46IDA7XG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbn1cblxuLyogTGVhcm5pbmcgUG9pbnRzIFNlY3Rpb24gKi9cbi5sZWFybmluZy1wb2ludHMtc2VjdGlvbiB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBwYWRkaW5nOiAzMHB4O1xuICBtYXJnaW4tYm90dG9tOiAyNXB4O1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4ubGVhcm5pbmctcG9pbnRzLXNlY3Rpb24gaDMge1xuICBjb2xvcjogIzMzMztcbiAgbWFyZ2luOiAwIDAgMjVweCAwO1xuICBmb250LXNpemU6IDEuOGVtO1xufVxuXG4ubGVhcm5pbmctcG9pbnRzLWxpc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDIwcHg7XG59XG5cbi5sZWFybmluZy1wb2ludC1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAyMHB4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgcGFkZGluZzogMjBweDtcbiAgYmFja2dyb3VuZDogI2YwZjhmZjtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBib3JkZXItbGVmdDogNHB4IHNvbGlkICMwMDY2Y2M7XG59XG5cbi5wb2ludC1udW1iZXIge1xuICB3aWR0aDogNDBweDtcbiAgaGVpZ2h0OiA0MHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMwMDY2Y2MgMCUsICMwMDQ0OTkgMTAwJSk7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmbGV4LXNocmluazogMDtcbn1cblxuLnBvaW50LXRleHQge1xuICBmbGV4OiAxO1xuICBjb2xvcjogIzMzMztcbiAgbGluZS1oZWlnaHQ6IDEuNztcbiAgZm9udC1zaXplOiAxNnB4O1xuICBtYXJnaW46IDA7XG59XG5cbi8qIE5leHQgQ29uY2VwdCBTZWN0aW9uICovXG4ubmV4dC1jb25jZXB0LXNlY3Rpb24ge1xuICBtYXJnaW4tYm90dG9tOiAyNXB4O1xufVxuXG4ubmV4dC1jb25jZXB0LWNhcmQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZmZmNGU2IDAlLCAjZmZlNmNjIDEwMCUpO1xuICBib3JkZXI6IDJweCBzb2xpZCAjZmZkOWIzO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBwYWRkaW5nOiAyNXB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5uZXh0LWNvbmNlcHQtY2FyZCBoNCB7XG4gIGNvbG9yOiAjY2M2NjAwO1xuICBtYXJnaW46IDAgMCAxMHB4IDA7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cblxuLm5leHQtY29uY2VwdC1jYXJkIHAge1xuICBjb2xvcjogIzk5NTUwMDtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBtYXJnaW46IDA7XG59XG5cbi8qIEFjdGlvbiBTZWN0aW9uICovXG4uYWN0aW9uLXNlY3Rpb24ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi10b3A6IDQwcHg7XG4gIHBhZGRpbmctdG9wOiAzMHB4O1xuICBib3JkZXItdG9wOiAycHggc29saWQgI2U5ZWNlZjtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAyMHB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuXG4uYnRuLXByaW1hcnkge1xuICBwYWRkaW5nOiAxOHB4IDQwcHg7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmMDkzZmIgMCUsICNmNTU3NmMgMTAwJSk7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBmb250LXNpemU6IDE4cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3M7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgyNDUsIDg3LCAxMDgsIDAuMyk7XG59XG5cbi5idG4tcHJpbWFyeTpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtM3B4KTtcbiAgYm94LXNoYWRvdzogMCA2cHggMjBweCByZ2JhKDI0NSwgODcsIDEwOCwgMC40KTtcbn1cblxuLmJ0bi1zZWNvbmRhcnkge1xuICBwYWRkaW5nOiAxOHB4IDQwcHg7XG4gIGJhY2tncm91bmQ6ICM2Yzc1N2Q7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBmb250LXNpemU6IDE4cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3M7XG59XG5cbi5idG4tc2Vjb25kYXJ5OmhvdmVyIHtcbiAgYmFja2dyb3VuZDogIzVhNjI2ODtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpO1xufVxuXG4uYnRuLWxhcmdlIHtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBwYWRkaW5nOiAyMHB4IDUwcHg7XG59XG5cbi8qIFJlc3BvbnNpdmUgRGVzaWduICovXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLnN0b3J5LWdlbmVyYXRpb24tY29udGFpbmVyIHtcbiAgICBwYWRkaW5nOiAxMHB4O1xuICB9XG4gIFxuICAuaGVhZGVyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGdhcDogMTVweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cbiAgXG4gIC5oZWFkZXIgaDEge1xuICAgIGZvbnQtc2l6ZTogMS44ZW07XG4gIH1cbiAgXG4gIC5wYW5lbC1jYXJkIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuICBcbiAgLnBhbmVscy1ncmlkIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgfVxuICBcbiAgLmFjdGlvbi1zZWN0aW9uIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB9XG4gIFxuICAuYnRuLXByaW1hcnksIC5idG4tc2Vjb25kYXJ5IHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxufVxuXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 9618:
/*!**************************************************!*\
  !*** ./src/app/services/user-profile.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserProfileService": () => (/* binding */ UserProfileService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 8987);


class UserProfileService {
  http;
  apiUrl = 'http://localhost:8000/api'; // Backend API URL
  constructor(http) {
    this.http = http;
  }
  analyzeProfile(childId) {
    return this.http.post(`${this.apiUrl}/profile/analyze`, {
      child_id: childId
    });
  }
  generateStory(profile) {
    return this.http.post(`${this.apiUrl}/story/generate`, {
      profile: profile
    });
  }
  generateQuiz(story, profile) {
    const body = {
      story: story
    };
    if (profile) {
      body.profile = profile;
    }
    return this.http.post(`${this.apiUrl}/quiz/generate`, body);
  }
  startLearningJourney(childId) {
    return this.http.get(`${this.apiUrl}/start/${childId}`);
  }
  submitQuiz(childId, submission) {
    return this.http.post(`${this.apiUrl}/submit_quiz/${childId}`, submission);
  }
  getRewards(childId) {
    return this.http.get(`${this.apiUrl}/rewards/${childId}`);
  }
  static ɵfac = function UserProfileService_Factory(t) {
    return new (t || UserProfileService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: UserProfileService,
    factory: UserProfileService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);


_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map