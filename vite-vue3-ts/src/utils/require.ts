const executor = (req: any, payload: any) => {
  if (req) {
    Object.keys(req).forEach((key: string) => {
      const register = req[key].default;
      register(payload);
    });
  }
};

export { executor };
