export default {
  common: [{
    ciid: {
      type: "string",
      description: "资源的唯一识别码"
    }
  }, {
    ciname: {
      type: "string",
      description: "资源的名称"
    }
  }, {
    check: {
      type: "string",
      description: "配置审核活动中，资源的审核状态，分为：已审核、未审核、不匹配、丢失"
    }
  }, {
    last_check_time: {
      type: "string",
      format: "date-time",
      description: '最近一次审核该资源的时间，即审核状态从”未审核”变为”已审核”/”不匹配”/”丢失”任一状态的时间；参见“配置审核” 定义YYYY-MM-DD hh:mm（系统自动产生）'
    }
  }, {
    create_time: {
      type: "string",
      format: "date-time",
      description: '该资源被创建的时间YYYY-MM-DD hh:mm（系统自动产生）'
    }
  }, {
    isdelete: {
      type: "string",
      description: "该资源是否被删除；分为：正常/已删除"
    }
  }, {
    delete_time: {
      type: "string",
      format: "date-time",
      description: '该资源被删除的时间，既删除状态从”正常”变为”已删除”的时间YYYY-MM-DD hh:mm（系统自动产生）'
    }
  }, {
    manager: {
      type: "string",
      description: "该资源在服务管理平台中的管理人员，缺省为创建该资源的人员（系统自动产生）"
    }

  }, {
    last_update_staff: {
      type: "string",
      description: "最后更新该资源的人员（系统自动产生）"
    }
  }, {
    last_update_time: {
      type: "string",
      format: "date-time",
      description: '最后更新该资源的时间，既最后一次更新资源任一属性的时间；YYYY-MM-DD hh:mm（系统自动产生）'
    }
  }, {
    description: {
      type: "string",
      description: "该资源的其他描述信息（手工填写）"
    }
  }],
  Business: [{
    level: {
      type: "string",
      default: "SaaS",
      description: "描述该资源所处层级；具体描述为SaaS"
    }
  }, {
    name: {
      type: "string",
      description: "资源所属的系统名称，参见“资源所属系统” 定义（自动填写）"
    }
  }, {
    module: {
      type: "array",
      type: "string",
      description: "资源所属系统的模块名称，参见资源管理建设方案附录“5.4” 定义，支持填多个（自动填写）"
    }
  }, {
    sub_module: {
      type: "array",
      type: "string",
      description: "资源所属系统的子模块名称，参见资源管理建设方案附录“5.4” 定义，支持填多个（自动填写）"
    }
  }, {
    influence_area: {
      type: "string",
      description: "描述该资源失效后会影响到的区域范围；具体描述为：全省、某中心、某关键地市、其他地市"
    }
  }, {
    influence_customer: {
      type: "string",
      description: "描述该资源失效后会影响到的客户：具体描述为：所有客户、全球通客户、神州行客户、动感地带客户等。"
    }
  }, {
    influence_system: {
      type: "string",
      description: "描述该资源失效后会影响到的系统范围，分为：BOSS应用、CRM应用、PBOSS等"
    }

  }, {
    department: {
      type: "string",
      description: "使用该资源部门（手工填写）"
    }
  }, {
    service_level: {
      type: "string",
      description: "资源支持服务厂商提供的相应的服务级别（如5x8，7x24等）（手工填写）"
    }

  }, {
    integrator: {
      type: "string",
      description: "该资源管理建设方案的集成商“参见附录5.2”（自动填写）"
    }
  }],
  Application: [{
    level: {
      type: "string",
      default: "SaaS",
      description: "描述该资源所处层级；具体描述为SaaS"
    }
  }, {
    name: {
      type: "string",
      description: "资源所属的系统名称，参见“资源所属系统” 定义（自动填写）"
    }
  }, {
    module: {
      type: "string",
      description: "资源所属系统的模块名称，参见资源管理建设方案附录“5.4” 定义（自动填写）"
    }
  }, {
    sub_module: {
      type: "string",
      description: "资源所属系统的子模块名称，参见资源管理建设方案附录“5.4” 定义（自动填写）"
    }
  }, {
    influence_area: {
      type: "string",
      description: "描述该资源失效后会影响到的区域范围；具体描述为：全省、某中心、某关键地市、其他地市"
    }
  }, {
    influence_customer: {
      type: "string",
      description: "描述该资源失效后会影响到的客户：具体描述为：所有客户、全球通客户、神州行客户、动感地带客户等。"
    }
  }, {
    influence_system: {
      type: "string",
      description: "描述该资源失效后会影响到的系统范围，分为：BOSS应用、CRM应用、PBOSS等"
    }
  }, {
    department: {
      type: "string",
      description: "使用该资源部门（手工填写）"
    }
  }, {
    service_level: {
      type: "string",
      description: "资源支持服务厂商提供的相应的服务级别（如5x8，7x24等）（手工填写）"
    }
  }, {
    integrator: {
      type: "string",
      description: "该资源管理建设方案的集成商“参见附录5.2”（自动填写）"
    }
  }, {
    service_provider: {
      type: "string",
      description: "为该资源管理建设方案提供服务的厂商名称，“参见附录5.3”（手工填写）"
    }
  }],
  Logic: [{
    level: {
      type: "string",
      description: "描述该资源所处层级；具体描述为：IaaS、PaaS"
    }
  }, {
    name: {
      type: "string",
      description: "资源所属的系统名称，参见“资源所属系统” 定义（自动填写）"
    }
  }, {
    module: {
      type: "array",
      type: "string",
      description: "资源所属系统的模块名称，参见资源管理建设方案附录“5.4” 定义，支持填多个（自动填写）"
    }
  }, {
    sub_module: {
      type: "array",
      type: "string",
      description: " 资源所属系统的子模块名称，参见资源管理建设方案附录“5.4” 定义，支持填多个（自动填写）"
    }
  }, {
    influence_area: {
      type: "string",
      description: "描述该资源失效后会影响到的区域范围；具体描述为：全省、某中心、某关键地市、其他地市"
    }
  }, {
    influence_customer: {
      type: "string",
      description: "描述该资源失效后会影响到的客户：具体描述为：所有客户、全球通客户、神州行客户、动感地带客户等。"
    }
  }, {
    influence_system: {
      type: "string",
      description: "描述该资源失效后会影响到的系统范围，分为：BOSS应用、CRM应用、PBOSS等"
    }
  }, {
    department: {
      type: "string",
      description: " 使用该资源部门（手工填写）"
    }
  }, {
    service_level: {
      type: "string",
      description: "资源支持服务厂商提供的相应的服务级别（如5x8，7x24等）（手工填写）"
    }
  }, {
    integrator: {
      type: "string",
      description: "该资源管理建设方案的集成商“参见附录5.2”（自动填写）"
    }
  }, {
    service_provider: {
      type: "string",
      description: "为该资源管理建设方案提供服务的厂商名称，“参见附录5.3”（自动填写）"
    }
  }],
  Physical: [{
    level: {
      type: "string",
      default: "IaaS",
      description: "描述该资源所处层级；具体描述为IaaS"
    }
  }, {
    asset_number: {
      type: "string",
      description: "该资源的资产编号"
    }
  }, {
    serial_number: {
      type: "string",
      description: "该资源的序列号"
    }
  }, {
    name: {
      type: "string",
      description: "资源所属的系统名称，参见“资源所属系统” 定义（自动填写）"
    }
  }, {
    module: {
      type: "array",
      type: "string",
      description: "资源所属系统的模块名称，参见资源管理建设方案附录“5.4” 定义，支持填多个（自动填写）"
    }
  }, {
    sub_module: {
      type: "array",
      description: " 资源所属系统的子模块名称，参见资源管理建设方案附录“5.4” 定义，支持填多个（自动填写）"
    }
  }, {
    influence_area: {
      type: "string",
      description: "描述该资源失效后会影响到的区域范围；具体描述为：全省、某中心、某关键地市、其他地市"
    }
  }, {
    influence_customer: {
      type: "string",
      description: " 描述该资源失效后会影响到的客户：具体描述为：所有客户、全球通客户、神州行客户、动感地带客户等。"
    }
  }, {
    influence_system: {
      type: "string",
      description: "描述该资源失效后会影响到的系统范围，分为：BOSS应用、CRM应用、PBOSS等"
    }
  }, {
    department: {
      type: "string",
      description: "使用该资源部门（手工填写）"
    }
  }, {
    service_start: {
      type: "string",
      format: "date-time",
      description: "资源支持服务的服务合同开始日期YYYY-MM-DD（手工填写）"
    }

  }, {
    service_end: {
      type: "string",
      format: "date-time",
      description: " 资源支持服务的服务合同结束日期YYYY-MM-DD（手工填写）"
    }
  }, {
    manufacturer: {
      type: "string",
      description: "该资源的原始厂商 ，“参见资源管理建设方案附录5.1”"
    }
  }, {
    service_level: {
      type: "string",
      description: "资源支持服务厂商提供的相应的服务级别（如5x8，7x24等）（自动填写）"
    }
  }, {
    service_provider: {
      type: "string",
      description: "为该资源管理建设方案提供服务的厂商名称，“参见附录5.3”（自动填写）"
    }
  }, {
    service_tel: {
      type: "string",
      description: "资源支持服务厂商提供的支持服务的联系方式，能提供联络信息，如电话、邮件等（手工填写）"
    }
  }],
  other: [{
    location: {
      type: "string",
      description: "该资源的物理位置"
    }
  }]
}