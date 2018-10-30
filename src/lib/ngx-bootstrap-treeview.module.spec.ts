import { NgxBootstrapTreeviewModule } from './ngx-bootstrap-treeview.module';

describe('TreeviewModule', () => {
    let treeviewModule: NgxBootstrapTreeviewModule;

    beforeEach(() => {
        treeviewModule = new NgxBootstrapTreeviewModule();
    });

    it('should create an instance', () => {
        expect(NgxBootstrapTreeviewModule).toBeTruthy();
    });
});
