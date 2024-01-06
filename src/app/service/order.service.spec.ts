import { TestBed } from '@angular/core/testing';

import { OrderServices } from './order.service';

describe('CartegoryService', () => {
    let service: OrderServices;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(OrderServices);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
