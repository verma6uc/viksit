import { Component, OnInit, ViewChild } from '@angular/core';
import { WizardComponent } from 'ng2-archwizard';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfiguration } from '../app.constants';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Lesson } from '../pojo/lesson/lesson';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-content-admin-review-task',
  templateUrl: './content-admin-review-task.component.html',
  styleUrls: ['./content-admin-review-task.component.css'],
  providers: [DatePipe]
})
export class ContentAdminReviewTaskComponent implements OnInit {
  progress = 50;
  isOn = true;
  task_id: string;
  isDisabled = false;
  progressWidth1 = 0;
  progressWidth2 = 0;
  currentprogress = 0;
  complex_object;
  issuesList: any;
  isInclude2ndStep = false;
  newCourse;
  users = [];
  lessonList = [];
  selectedUser: any;
  courseDueDate;
  courseAssignee;
  lessonListFilter;
  public loading = false;
  public todaydate = new Date();
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private http: HttpClient, private datePipe: DatePipe, private router: Router, private route: ActivatedRoute) {
    this.task_id = this.route.snapshot.params.task_id;

  }
  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
    disableUntil: { year: 0, month: 0, day: 0 }
  };

  disableUntil() {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    let copy = this.getCopyOfOptions();
    copy.disableUntil = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    };
    this.myOptions = copy;
  }
  getCopyOfOptions(): INgxMyDpOptions {
    return JSON.parse(JSON.stringify(this.myOptions));
  }

  // Initialized to specific date (09.10.2018)
  dateFormatted: Date;
  model: any;

  // optional date changed callback
  onDateChanged(value, type): void {
    // date selected
    if (type == 'lesson') {
      this.onChangeAssignee(value);
    }
  }

  ngOnInit() {
    this.loading = true;
    const local_complex_object = localStorage.getItem('currentUser');
    this.complex_object = JSON.parse(local_complex_object);
    this.http.get(AppConfiguration.ServerWithApiUrl + 'course/1/course_structure/' + this.task_id).takeUntil(this.ngUnsubscribe).subscribe(data => {
      // Read the result field from the JSON response.
      this.newCourse = data['data'];
      this.courseDueDate = this.newCourse.dueDate;
      this.dateFormatted = new Date(this.courseDueDate.split('-')[2] + "-" + this.courseDueDate.split('-')[1] + "-" + this.courseDueDate.split('-')[0]);
      this.model = {
        date: {
          year: this.dateFormatted.getFullYear(),
          month: this.dateFormatted.getMonth() + 1,
          day: this.dateFormatted.getDate()
        }
      }
      this.courseAssignee = this.newCourse.assignee;
      for (let issue of this.newCourse.issues) {
        for (let comments of issue.comments) {
          this.issuesList.push(comments);
        }
      }
      this.lessonUpdateList();
      this.loading = false;
      this.isInclude2ndStep = true;
    });
    var types = { "userType": "CONTENT_CREATOR,CONTENT_ADMIN" };
    const body = new HttpParams().set('type', JSON.stringify(types));
    this.http.post(AppConfiguration.ServerWithApiUrl + 'user/user_bytype', body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    }).takeUntil(this.ngUnsubscribe).subscribe(data => {
      // Read the result field from the JSON response.
      this.users = data['data'];
      //this.getCourseAssignee();
      for (let user of this.users) {
        if (user.id == this.courseAssignee) {
          this.selectedUser = user.id;
        }
      }
    });
    this.disableUntil();
  }

  enterSecondStep($event) {

    if (this.wizard != undefined) {
      this.currentprogress = this.wizard.model.currentStepIndex;
      if (this.wizard.model.currentStepIndex == 0) {
        this.progressWidth1 = 0;
        this.progressWidth2 = 0;
        this.isOn = true;
      }
      if (this.wizard.model.currentStepIndex == 1) {
        this.lessonUpdateList();
        this.getCourseAssignee();
        this.progressWidth1 = 33;
        this.progressWidth2 = 0;
        this.isOn = true;
        this.isDisabled = true;
      } if (this.wizard.model.currentStepIndex == 2) {
        this.progressWidth2 = 34;
        this.isOn = true;
        this.isDisabled = true;
      }

    } else {
      this.progressWidth1 = 0;
      this.progressWidth2 = 0;
      this.currentprogress = 0;
      this.isOn = true;
    }
  }
  lessonUpdateList() {
    this.lessonList = [];
    for (let module of this.newCourse.modules) {
      for (let session of module.sessions) {
        for (let lesson of session.lessons) {
          this.lessonList.push(lesson);
        }
      }
    }
    this.lessonListFilter = this.lessonList;
  }
  getUsername(userId) {
    for (let user of this.users) {
      if (user.id == userId) {
        return user.email;
      }
    }
  }
  getColor(dueDate) {
    var dateCompare = new Date();
    var compare = dateCompare.getDate() + '-' + (dateCompare.getMonth() + 1) + '-' + dateCompare.getFullYear();
    if (dueDate <= compare) {
      return "red";
    } else {
      return "green";
    }
  }
  getCourseAssignee() {
    for (let user of this.users) {
      if (user.id == this.courseAssignee) {
        this.selectedUser = user.id;
      }
    }
  }
  getStatus(lesson) {
    //console.log(lesson)
    var dateCompare = new Date();
    var compare = dateCompare.getDate() + '-' + ((dateCompare.getMonth() + 1) < 10 ? '0' : '') + (dateCompare.getMonth() + 1) + '-' + dateCompare.getFullYear();
    if (lesson.dueDate <= compare || lesson.dueDate == "" || lesson.dueDate == null) {
      return "#c9302c";
    } else {
      return "#5cb85c";
    }
  }
  completeReview() {
    this.newCourse.dueDate = this.model.formatted;
    this.newCourse.assignee = this.selectedUser;
    this.loading = true;
    const body = new HttpParams().set('course_object', JSON.stringify(this.newCourse));
    this.http.post(AppConfiguration.ServerWithApiUrl + 'course/1/review_course_structure/' + this.complex_object.id + '/' + this.task_id, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    }).takeUntil(this.ngUnsubscribe).subscribe(res => {
      this.newCourse = res['data'];
      this.loading = false;
      this.router.navigate(['/dashboard'], { relativeTo: this.route });
    }, error => {
      console.log('Some thing went wrong on submitting')
    });
  }
  onChangeAssignee(lesson) {
    for (let module of this.newCourse.modules) {
      for (let session of module.sessions) {
        for (let mainLesson of session.lessons) {
          if (mainLesson.id == lesson.id) {
            mainLesson.status = "ASSIGNED";
          }
        }
      }
    }
  }
  public validateStep() {
    var isValid = true;
    var flag = true;
    for (let lesson of this.lessonList) {
      if (flag) {
        if (lesson.dueDate == "" || lesson.dueDate == null) {
          isValid = true;
          break;
        } else if (lesson.assignee == null) {
          isValid = true;
          break;
        } else {
          isValid = false;
        }
        if (isValid) {
          flag = false;
        }
      }
    }
    return isValid;
  }
  setCustomModelDate($event) {
    if ($event != null && $event.formatted != null && $event.formatted != undefined && $event.formatted != "") {
      return $event.formatted;
    } else {
      return "";
    }
  }
  searchTerm(value) {
    console.log(value);
    this.lessonListFilter = this.lessonList;
    if (value.trim() == '') {
      this.lessonListFilter = this.lessonList;
    } else {
      var re = value.toLowerCase().trim();
      this.lessonListFilter = this.lessonListFilter.filter((item: any) => {
        if (item.description.toLowerCase().trim().indexOf(re) > -1) {
          return true;
        } else if (item.name.toLowerCase().trim().indexOf(re) > -1) {
          return true;
        } else if (this.getUsername(item.assignee).toLowerCase().trim().indexOf(re) > -1) {
          return true;
        }
      });
    }

  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    console.log("unsubscribe");
  }
}
