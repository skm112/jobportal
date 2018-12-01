import { JobPortalModule } from './job-portal.module';

describe('JobPortalModule', () => {
  let jobPortalModule: JobPortalModule;

  beforeEach(() => {
    jobPortalModule = new JobPortalModule();
  });

  it('should create an instance', () => {
    expect(jobPortalModule).toBeTruthy();
  });
});
