export const application = {
  getStatus({ params, search }) {
    const valid = ['pending', 'approved', 'rejected'];

    const paramStatus = params?.toLowerCase();
    if (valid.includes(paramStatus)) return paramStatus;

    const searchParams = new URLSearchParams(search);
    const queryStatus = searchParams.get('status');
    if (valid.includes(queryStatus)) return queryStatus;

    return 'pending';
  },

  normalizeApplications(applications, currentTabStatus) {
    return applications.map((app, index) => ({
      ...app,
      id: app.id ?? app.application_id ?? `${currentTabStatus}-${index}`,
      status: app.status || currentTabStatus,
      submitted_at: app.submitted_at ?? app.submited_at,
      submited_at: app.submited_at ?? app.submitted_at,
    }));
  },
};
