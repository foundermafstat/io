export const zh = {
    broadcast: {
        end: "结束广播",
        live: "直播中",
        start: "开始广播"
    },
    header: {
        title: "关于",
        about: "这是一个旨在演示如何在现代 Next 15 项目中使用 OpenAI 实时 API 和 WebRTC 的项目。它已安装了 shadcn/ui 组件并实现了 WebRTC 音频会话钩子。克隆项目并定义您自己的工具。",
        banner: "🎉 快来看看全新的 Next.js OpenAI 实时块用户界面库！",
        bannerLink: "了解更多 →",
        beta: "测试版",
        dark: "深色",
        github: "在 GitHub 上标星",
        language: "语言",
        light: "浅色",
        logo: "OpenAI 实时启动器",
        system: "系统",
        theme: "切换主题",
        twitter: "在推特上关注",
        home: "首页",
        realEstate: "房地产",
        adminPanel: "管理面板",
        development: "开发",
        propertySearch: "房产搜索与购买",
        systemManagement: "系统管理",
        developmentTools: "开发工具",
        browseProperties: "浏览房产",
        smartSearch: "智能搜索",
        compareProperties: "比较房产",
        contactAgent: "联系经纪人",
        bookViewing: "预约看房",
        replicasManagement: "副本管理",
        aiTraining: "AI 训练",
        databaseManagement: "数据库管理",
        settings: "设置",
        apiKeys: "API 密钥",
        chatHistory: "聊天记录",
        experimentalApi: "实验性 API",
        activeReplica: "活跃副本",
        refreshReplicas: "刷新副本",
        noReplicasAvailable: "没有可用的副本",
        loadingReplicas: "正在加载副本...",
        selectReplica: "选择副本",
        hideAiAssistant: "隐藏 AI 助手",
        showAiAssistant: "显示 AI 助手"
    },
    hero: {
        badge: "Next.js + shadcn/ui",
        subtitle: "点击下方按钮进行演示并尝试可用工具",
        title: "OpenAI 实时 API (WebRTC)"
    },
    messageControls: {
        content: "内容",
        filter: "按类型筛选",
        log: "控制台日志",
        logs: "对话记录",
        search: "搜索消息...",
        type: "类型",
        view: "查看日志"
    },
    status: {
        error: "哎呀！",
        info: "正在切换语音助手...",
        language: "语言已从以下更改",
        session: "会话已建立",
        success: "我们已经开始直播了！",
        toggle: "正在切换语音助手..."
    },
    tokenUsage: {
        input: "输入令牌",
        output: "输出令牌",
        total: "总令牌数",
        usage: "令牌使用量"
    },
    tools: {
        availableTools: {
            title: "可用工具",
            copyFn: {
                description: '说"复制到剪贴板"以将其粘贴到某处。',
                name: "复制功能"
            },
            getTime: {
                description: '问"现在几点了？"以获取当前时间。',
                name: "获取时间"
            },
            launchWebsite: {
                description: '说"带我去[网站]"以在新标签页中打开网站。',
                name: "启动网站"
            },
            partyMode: {
                description: '说"开启派对模式"以启动动态彩带动画！',
                name: "派对模式"
            },
            themeSwitcher: {
                description: '说"更换背景"或"切换到深色模式"或"切换到浅色模式"。',
                name: "主题切换器"
            },
            scrapeWebsite: {
                name: "网页内容提取器",
                description: '说"提取[网站URL]的内容"来获取网页内容。'
            },
            navigateToPage: {
                name: "导航到页面",
                description: '说"转到[页面]"或"打开[URL]"来导航到特定页面。'
            }
        },
        clipboard: {
            description: "您现在可以将其粘贴到某处。",
            success: "文本已复制到剪贴板。请让用户将其粘贴到某处。",
            toast: "文本已复制到剪贴板！"
        },
        launchWebsite: {
            description: "启动网站失败",
            success: "网站已启动！告诉用户网站已经打开。",
            toast: "正在启动网站 "
        },
        partyMode: {
            description: "无法激活派对模式",
            success: "派对模式已激活",
            toast: "派对模式！"
        },
        switchTheme: "主题已切换至 ",
        themeFailed: "主题切换失败",
        time: "向用户播报：当前时间是 ",
        scrapeWebsite: {
            success: "网页内容提取成功",
            description: "网页内容提取失败",
            toast: "正在提取网页内容..."
        }
    },
    transcriber: {
        title: "实时转录"
    },
    voice: {
        select: "选择语音",
        ash: "Ash - 温和专业",
        ballad: "Ballad - 温暖动人",
        coral: "Coral - 清晰友好",
        sage: "Sage - 权威平静",
        verse: "Verse - 富有表现力"
    },
  chatTabs: {
    textChat: "文字聊天",
    voiceChat: "语音聊天"
  },
  voiceChat: {
    selectReplica: "选择副本",
    loadingReplicas: "正在加载副本...",
    selectVoice: "选择语音"
  },
  language: "Chinese",
  languagePrompt: "只用中文说话和回答。你一定要保持你的回答是中文的。如果用户说其他语言，你应该用中文回答。（Speak Chinese only）",
  quiz: {
    title: "用IO寻找房产",
    intro: {
      title: "欢迎来到IO房产测验",
      subtitle: "让我们一起找到您的完美房产！我将通过几个问题来了解您的需求。",
      discover: {
        title: "我们将了解：",
        items: [
          "租赁或购买偏好",
          "预算范围",
          "房产类型偏好",
          "理想位置",
          "必备功能"
        ]
      },
      aiPowered: {
        title: "AI驱动指导：",
        items: [
          "语音或文字聊天",
          "个性化推荐",
          "实时房产匹配",
          "专家建议"
        ]
      },
      ready: "准备好找到您的梦想房产了吗？让我们开始旅程！"
    },
    steps: {
      purpose: {
        title: "租赁还是购买？",
        subtitle: "您是在寻找租赁房产还是购买房产？这将帮助我调整推荐。",
        rent: {
          title: "租赁",
          description: "灵活居住，前期成本较低，购买前先试用"
        },
        buy: {
          title: "购买",
          description: "长期投资，建立资产，创造您的永久家园"
        }
      },
      budget: {
        title: "预算范围",
        subtitle: "您的租赁/购买预算是多少？",
        custom: "自定义"
      },
      propertyType: {
        title: "房产类型",
        subtitle: "您对什么类型的房产感兴趣？选择所有适用的选项。",
        selected: "已选择："
      },
      location: {
        title: "位置",
        subtitle: "您想住在哪里？选择您偏好的区域。"
      },
      features: {
        title: "必备功能",
        subtitle: "选择对您重要的功能。您可以选择多个选项。"
      },
      results: {
        title: "完美！这是您的个人资料",
        subtitle: "根据您的偏好，这是您寻找的：",
        purpose: "目的",
        budget: "预算",
        propertyTypes: "房产类型",
        location: "位置",
        features: "必备功能",
        notSpecified: "未指定",
        noFeatures: "未选择功能",
        searchMessage: "现在让我搜索符合您标准的房产...",
        startOver: "重新开始",
        searchProperties: "搜索房产"
      }
    },
    navigation: {
      prev: "上一步",
      next: "下一步",
      skip: "跳过",
      step: "步骤"
    },
    properties: {
      allAvailable: "所有可用房产",
      byPurpose: "按目的分类的房产",
      byBudget: "您预算内的房产",
      byType: "按类型分类的房产",
      byArea: "您所在区域的房产",
      byFeatures: "具有您所需功能的房产",
      perfectMatches: "您的完美匹配",
      matching: "匹配的房产",
      found: "找到",
      property: "房产",
      properties: "房产",
      noProperties: "未找到房产",
      completeSteps: "完成更多步骤以查看个性化推荐",
      adjustPreferences: "尝试调整您的偏好以查看更多结果",
      selected: "已选择",
      featured: "精选",
      verified: "已验证",
      rent: "租赁",
      sale: "销售",
      perMonth: "每月",
      views: "查看",
      reviews: "评论",
      view: "查看"
    }
  },
  homepage: {
    title: "用AI找到您的梦想房产",
    hero: {
      title: "用AI找到您的梦想房产",
      subtitle: "使用智能AI助手发现房产",
      callToAction: "致电预订您的房产",
      locationPlaceholder: "添加房产后位置将可用",
      propertyLogos: ["豪华", "现代", "经典", "别墅", "顶层公寓", "联排别墅", "豪宅", "房产"]
    },
    popularTypes: {
      title: "热门房产类型",
      placeholder: "添加房产后房产类型将可用",
      objects: "个房产"
    },
    trending: {
      title: "热门方向：最佳位置",
      placeholder: "添加房地产后城市数据将可用",
      objects: "个房产",
      from: "起价"
    },
    features: {
      title: "为什么选择我们",
      convenientSearch: {
        title: "便捷搜索",
        description: "使用AI的直观房产搜索流程。获得个性化推荐，立即找到绝佳交易。"
      },
      secureTransactions: {
        title: "安全交易",
        description: "彻底验证、透明条款和完整文档。已验证房产和可靠安全服务。"
      },
      smartNavigation: {
        title: "智能导航",
        description: "使用AI的位置分析和详细的社区研究，找到完美的房产，让搜索过程简单愉快。"
      }
    },
    testimonials: {
      title: "用户评价",
      reviews: [
        {
          name: "Olivia Parker",
          handle: "@oliviaparker",
          text: "最佳房产搜索体验！AI界面直观，轻松找到理想房产...强烈推荐！"
        },
        {
          name: "Emma Thompson",
          handle: "@emmathompson",
          text: "无缝体验！这个平台让房产搜索变得轻松...5星级服务！"
        },
        {
          name: "Sophia Rodriguez",
          handle: "@sophiarodriguez",
          text: "可靠且实惠！我之前使用过几个房产平台，但这个脱颖而出...我会为所有未来的搜索返回这里。"
        },
        {
          name: "Daniel Johnson",
          handle: "@danieljohnson",
          text: "卓越服务！从搜索到成交，一切都很顺利...一定会推荐给朋友！"
        }
      ]
    },
    cta: {
      title: "您的房地产之旅从这里开始。解锁无限可能！",
      button: "查看房产 >"
    },
    footer: {
      company: "Sensay.io",
      sections: {
        destinations: "目的地",
        destinationsItems: ["海滩房产", "历史街区", "都市生活", "山地度假村", "豪华别墅", "投资房产"],
        resources: "资源",
        resourcesItems: ["博客", "房地产指南", "市场分析", "投资建议", "房产类型"],
        policies: "政策",
        policiesItems: ["隐私", "使用条款", "Cookie设置"],
        newsletter: "新闻通讯",
        newsletterText: "加入我们的社区！获取独家优惠和市场洞察。",
        newsletterPlaceholder: "you@domain.com",
        newsletterButton: "订阅"
      },
      copyright: "源代码可在GitHub上获取。",
      phone: "电话"
    }
  },
  properties: {
    title: "房地产物业",
    foundCount: "找到的物业：{count}",
    errorLoading: "加载物业时发生错误",
    errorTitle: "加载错误",
    tryAgain: "重试",
    loadMore: "加载更多",
    loading: "加载中..."
  },
  propertyFilters: {
    searchPlaceholder: "搜索物业...",
    title: "筛选器",
    clear: "清除",
    operationType: "操作类型",
    selectOperationType: "选择类型",
    allTypes: "所有类型",
    rent: "出租",
    sale: "出售",
    both: "出租和出售",
    city: "城市",
    selectCity: "选择城市",
    allCities: "所有城市",
    loading: "加载中...",
    priceRange: "价格范围",
    from: "从",
    to: "到"
  },
  propertyGrid: {
    noResults: "未找到物业",
    tryDifferentFilters: "尝试更改您的搜索参数"
  }
}