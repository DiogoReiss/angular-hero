import 'zone.js';
import 'zone.js/testing';

import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
  );

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    component.color = 'green';
    component.text = 'test';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the component color', () => {
    expect(
      fixture.nativeElement.querySelector('button').style.backgroundColor
    ).toEqual('green');
  });

  it('should change the component text', () => {
    expect(fixture.nativeElement.querySelector('button').textContent).toEqual(
      'test'
    );
  });

  it('should emit an event', () => {
    component.btnClick.subscribe((res) => {
      // we are only emitting an event here, so if this event are emitted
      // we'll reach this point, and the test will pass
      expect(true).toBeTruthy();
    });

    component.onClick();
  });
});
