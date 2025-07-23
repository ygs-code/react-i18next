/**权限等级类型枚举 */
export const permissionType = [
    /*
    */
  {
    /**系统级别 */
    label: '系统',
    key: 'BOSystem',
    value: 100,
    disabled: true, // 系统级别不允许修改
  },
  {
    /**公司级别 */
    label: '公司',
    key: 'BOCompany',
    value: 200,
    disabled: true, // 系统级别不允许修改
  },
  {
    /**部门级别 */
    label: '主管',
    key: 'BODepartment',
    value: 300,
  },
  {
    /**用户级别 */
    label: '员工',
    key: 'BOUser',
    value: 400,
  },
];


export const aclGradeType = [
  {
    label: 'System',
    value: 100,
  },
  {
    label: 'Company',
    value: 200,
  },
  {
    label: 'Department',
    value: 300,
  },
];


 