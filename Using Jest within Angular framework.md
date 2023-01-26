#jest #angular
	references:
	- [Unit testing angular applications with jest](https://izifortune.com/unit-testing-angular-applications-with-jest/) 
	- [Integrate jest into an angular application](https://timdeschryver.dev/blog/integrate-jest-into-an-angular-application-and-library#splitting-up-jest)
	- [Jest unit test examples](https://allenhwkim.medium.com/angular5-jest-unit-test-examples-a9538ece6cd)
	- [Using @Input() to testing components](https://morioh.com/p/60b863dfeef1)
## Firsts steps 🐾
1. We need to install jest in the project
	```bash
	npm install --save-dev jest @types/jest jest-preset-angular
	# or if you are using yarn 
	yarn add -D jest @types/jest jest-preset-angular
	```
1. Add a "script" on package.json
	```json
	{
		...
		"scripts": {
			"test": "jest",
			"jest:watch": "jest --watch" // its not necessary but u can add too
		},
		"jest": {
			"preset": "jest-preset-angular",
			"setupTestFrameworkScriptFile": "<rootDir>/src/jest.ts"
		}
	}
	```
1. run jest --init, if "jest" command is not found you may have to install globally. After running the --init script you will have a jest.config file in the project directory, this file describe all the testing rules that jest will follow.
	```ts
	// <rootDir>/src/test.ts
	import 'jest-preset-angular';
	import './jest-global-mocks';
	
	// You may need to create some mocks to use concepts like localStorage and 
	// etc.
	```
1. If you use babel, or webpack, or so on you probably will have to configure a new config file, using babel for an example
	```js
	// npm install -save-dev babel-jest @babel/core @babel/preset-env
	// - babel.config.js
	module.exports = {  
		presets: [['@babel/preset-env', {targets: {node: 'current'}}]],  
	};
	```
1. Before we start testing, remove any test framwork or library from your project.
1. Now you already can start doing some tests :)
	- to write down your test you have to create a .spec.ts file, this ".spec.something-here" defines thats a test declaration file.
	```ts
	// default.component.spec.ts
	describe('test scenario', () => {
		let something = true; 
		...
		it('test case', () => {
			expect(something).toBeTruthy();
			...
		})
	})
	```
------------------------------------------------------------------------
## Testing Angular 🧰
 important links
- [UI Service link](https://github.com/DiogoReiss/angular-hero/blob/main/src/app/services/taks.service.ts)
- [UI Service test case link](https://github.com/DiogoReiss/angular-hero/blob/main/src/app/services/task.service.spec.ts)
- [Component link](https://github.com/DiogoReiss/angular-hero/blob/main/src/app/components/button/button.component.ts)
- [Component test case link](https://github.com/DiogoReiss/angular-hero/blob/main/src/app/components/button/button.component.spec.ts)
#### Lets begin with services
- Services are, most of the times, the smoothest files to unit test. Let's get the _UI Service_ for example, we have an apiUrl properties
	```ts
	private apiUrl: string = 'http://localhost:5000/tasks';
	```
	and a few methods, but lets take only the *getTaskByID* as example.
	```ts
	// task.service.ts
	...
	getTaskByID(task: TaskInterface['id']): Observable<TaskInterface[]> {
		let url = `${this.apiUrl}?id=${task}``;
		return this.http.get<TaskInterface[]>(url, httpOptions)
	}
	```
	Lets keep in mind that with the HttpClient there's no need to configure mockBackend :)
1. First thing we have to configure TestBed to load our service with HttpClientTestingModule.
	```ts
		beforeEach(() => {
			TestBed.configureTestingModule({
				imports: [ HttpClientTestingModule],
				providers: [
					TaskService
				]
			})
		})
		```
- After TestBed is configured we now can get our service to test and a mocking http controller from the injector
	```ts
	beforeEach(
		inject([SampleService, HttpTestingController], (_service, _httpMock) => {
			service = _service
			httpMock = _httpMock
		})
	)
	```
2. Now we can proceed with our tests.
	```ts
	it('Should get a specific task using the ID as reference', fakeAsync(() => {
		const requestID = 2
		const mockTaskResponse = [
		{
			"id": 2,
			"text": "Meeting at School",
			"day": "May 6th at 1:30pm",
		    "reminder": true
		}]

		service.getTaskByID(requestID).subscribe(response => {
			expect(response.length).toBe(1);
			expect(response[0].id).toBe(2);
			expect(response[0].text).toBe("Meeting at School")
		})
		tick();
		const req = httpMock.expectOne('http://localhost:5000/tasks');
		
		req.flush(mockTaskResponse);
		httpMock.verify();
	}))
	```
	---
#### Lets test our component 📦
1. ##### Fixtures
	- First lets talk about fixture, fixtures consist of "templates" containing configurations for the test that will be loaded, giving it a different context. We can see at it like an instance of an object.
	- Instead of creating three different test cases, we can write down only one test with 3 different contexts changing only the values we inject into the tested code and the expectation concerning its result.
---
##### Lets begin with the tests
1. If you already opened our component archive you know it's a simple component structure, we have two @input properties that we're using to modify some details on our button component like the actual background color and his inner text.
	```js
	...
	@Input() color!: string;
	@Input() text!: string;
	...
	}
	```
- and along with this two properties we have an output propertie too! It's a simple btnClick event that we will call.
```js
	... 
	@Output() btnClick = new EventEmitter();
	```
- and last but not least, we have a function too. This function will emit our btnClick event.
  ```js
	  ...
	  onClick() {
		  this.btnClick.emit();
	  }
	  ```
2. So, I believe that we already know how to properly create a test file and te meaning of ==fixture==, the only meaningfull difference between services tests and components/directives tests, we can write down our test cases :D.
   - First, we need to init our test environment and configure our testing module inside BeforeEach.
     ```ts
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
	```
-  Have you noted that I'm setting the component color and text inside the beforeEach configuration? This makes sense in that case because we will set this properties in the html tag like `<app-button color="{{ color }}">{{ text }}</app-button>`, if was something that we change in some way like using event or functions maybe this is not the best aproach to follow.
3. Now that we have our test enviroment and testing module all configured, lets create the test cases.
- It's nice to know that our component exists, right?
  ```ts
	  it('should create', () => {
		expect(component).toBeTruthy();
	  });
	  ```
- lets check the color.
```js
	it('should change the component color', () => {
		expect(
			fixture
				.nativeElement
				.querySelector('button')
				.style
				.backgroundColor
		).toEqual('green');
		// we are verifying if the tag "button" have the background-color
		// style equal "green"
});
```
- almost finished, lets take a look at the text.
```js
  

	it('should change the component text', () => {
		expect(
			fixture
				.nativeElement
				.querySelector('button')
				.textContent
		)
		.toEqual('test');
		// the same logic in the color test, but know we are taking the
		// textContent propertie ant verifying if it's equal "test"
	});
	```
- ok, now it's the last test we have! Let's see our event and function.
  ```js
	it('should emit an event', () => {
		component.btnClick.subscribe((res) => {
		// we are only emitting an event here, so if this event are emitted
		// we'll reach this point, and the test will pass
		expect(true).toBeTruthy();
	});
	component.onClick();
	});
	```
- So, as the @Output() event and the function are correlated we can test in that way because we only will know if the event are being correctly emmited if we call our onClick() function and it's a simple event and function, more complex cases of methods and eventEmitters it's better to have unique cases for both of them.