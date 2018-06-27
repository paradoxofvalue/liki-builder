import { BuilderModule } from './builder.module';

describe('BuilderModule', () => {
  let builderModule: BuilderModule;

  beforeEach(() => {
    builderModule = new BuilderModule();
  });

  it('should create an instance', () => {
    expect(builderModule).toBeTruthy();
  });
});
