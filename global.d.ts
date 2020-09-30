interface apiData {
    url: string;
    method: Cypress.HttpMethod;
    status: number;
    request: {
        body: any;
    };
    response: {
        body: any;
    };
    matchHostIndex: number;
}

interface apiSnapshotFixture {
    [testCaseName: string]: {
        timestamp: string;
        records: apiData[];
    };
}

declare namespace Cypress {
    // tslint:disable-next-line interface-name
    interface Chainable {
        _apiData: apiData[];
        _apiCount: number;
        _isRecordingMode: boolean;

        waitWhenApiRequestComplete: () => void;

        authentication(path: string): Chainable<Element>;
        captcha(type: string): Chainable<Element>;
        commonRoutes(): Chainable<Element>;
        google(): Chainable<Element>;
        goToRoute(route: string): Chainable<Element>;
        submitStep1(id: string): Chainable<Element>;
        submitStep1Validation(emailType: string, emailPassword: string): Chainable<Element>;
    }
}
