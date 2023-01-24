import 'zone.js';
import 'zone.js/testing';

import {
  fakeAsync,
  getTestBed,
  inject,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TaskService } from './task.service';
import {
  platformBrowserDynamicTesting,
  BrowserDynamicTestingModule,
} from '@angular/platform-browser-dynamic/testing';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
  );

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });
  }));

  beforeEach(inject(
    [TaskService, HttpTestingController],
    (_service: TaskService, _httpMock: any) => {
      service = _service;
      httpMock = _httpMock;
    }
  ));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a specific tasks by taking a ID reference', fakeAsync(() => {
    const requestID = 2;
    const mockTaskResponse = [
      {
        id: 2,
        text: 'Meeting at School',
        day: 'May 6th at 1:30pm',
        reminder: true,
      },
    ];
    service.getTaskByID(requestID).subscribe((response) => {
      expect(response.length).toBe(1);
      expect(response[0].id).toBe(2);
      expect(response[0].text).toBe('Meeting at School');
    });
    tick();
    const req = httpMock.expectOne('http://localhost:5000/tasks?id=2');

    req.flush(mockTaskResponse);
    httpMock.verify();
  }));
});
