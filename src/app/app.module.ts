import { AppConfiguration } from './app.constants';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { AuthGuard } from './auth-guard.service';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { AuthService } from './services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardContentCreatorComponent } from './dashboard-content-creator/dashboard-content-creator.component';
import { CourseBuilderContentCreatorComponent } from './course-builder-content-creator/course-builder-content-creator.component';
import { LessonBuilderContentCreatorComponent } from './lesson-builder-content-creator/lesson-builder-content-creator.component';
import { DashboardContentAdminComponent } from './dashboard-content-admin/dashboard-content-admin.component';
import { DndModule } from 'ng2-dnd';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { GraphComponent } from './graph/graph.component';
import { CoursesComponent } from './courses/courses.component';
import { PartialCourseListItemComponent } from './partial-course-list-item/partial-course-list-item.component';
import { PartialCloneModalComponent } from './partial-clone-modal/partial-clone-modal.component';
import { ArchwizardModule } from 'ng2-archwizard';
import { CreateCourseTaskComponent } from './create-course-task/create-course-task.component';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { LessonWizardComponent } from './partial-clone-modal/wizards/lesson-wizard/lesson-wizard.component';
import { SessionWizardComponent } from './partial-clone-modal/wizards/session-wizard/session-wizard.component';
import { ModuleWizardComponent } from './partial-clone-modal/wizards/module-wizard/module-wizard.component';
import { ContentAdminReviewTaskComponent } from './content-admin-review-task/content-admin-review-task.component';
import { DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { CourseBuilderServiceService } from './services/course_builder/course-builder-service.service';
import { SlideEditorComponent } from './slide-editor/slide-editor.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PresentationTemplatesComponent } from './slide-editor/templates/presentation-templates/presentation-templates.component';
import { LessonBuilderServiceService } from './services/lesson_bulider/lesson-builder-service.service';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { LoadingModule } from 'ngx-loading';
import { CKEditorModule } from 'ngx-ckeditor';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SlideBuilderServiceService } from './services/slide_builder/slide-builder-service.service';
import { PlayPresentationService } from './services/playpresentation/play-presentation-service';
import { AssessmentBuilderComponent } from './assessment-builder/assessment-builder.component';
import { AssessmentTemplateComponent } from './assessment-builder/assessment-template/assessment-template.component';
import { MediaconvertorComponent } from './mediaconvertor/mediaconvertor.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FieldErrorDisplayComponent,
    DashboardComponent,
    NavbarComponent,
    DashboardContentCreatorComponent,
    LessonBuilderContentCreatorComponent,
    DashboardContentAdminComponent,
    GraphComponent,
    CoursesComponent,
    PartialCourseListItemComponent,
    PartialCloneModalComponent,
    CreateCourseTaskComponent,
    CourseBuilderContentCreatorComponent,
    LessonWizardComponent,
    SessionWizardComponent,
    ModuleWizardComponent,
    ContentAdminReviewTaskComponent,
    SlideEditorComponent,
    PresentationTemplatesComponent,
    AssessmentBuilderComponent,
    AssessmentTemplateComponent,
    MediaconvertorComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DndModule.forRoot(),
    Ng2GoogleChartsModule,
    ArchwizardModule,
    NgxMyDatePickerModule.forRoot(),
    NgSelectModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    BrowserModule,
    SwiperModule,
    LoadingModule,
    CKEditorModule,
    ImageCropperModule
  ],
  providers: [AuthService,
    AuthGuard,
    AppConfiguration,
    DatePipe,
    CourseBuilderServiceService,
    LessonBuilderServiceService,
    SlideBuilderServiceService,
    PlayPresentationService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})


export class AppModule { }
