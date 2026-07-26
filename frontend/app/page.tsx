import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* 导航 */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">特殊教育实证干预知识库</h1>
            <div className="flex gap-4">
              <Link href="/disabilities" className="text-gray-600 hover:text-blue-600">
                障碍类型
              </Link>
              <Link href="/interventions" className="text-gray-600 hover:text-blue-600">
                干预方法
              </Link>
              <Link href="/resources" className="text-gray-600 hover:text-blue-600">
                国际资源
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 英雄区 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          权威的特殊教育干预方法库
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          汇集美国、英国、日本、俄罗斯、新加坡、澳大利亚、香港、台湾等国家和地区的最新实证干预策略，
          帮助特殊儿童家长和教育工作者找到最有效的支持方法。
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/disabilities"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            浏览障碍类型
          </Link>
          <Link 
            href="/search"
            className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            搜索干预方法
          </Link>
        </div>
      </section>

      {/* 特性区 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-lg font-semibold mb-3">完整的障碍分类</h3>
            <p className="text-gray-600">
              覆盖自闭症、智力障碍、语言障碍、听觉障碍、视觉障碍、运动障碍等主要特殊教育类别。
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-4">🔬</div>
            <h3 className="text-lg font-semibold mb-3">循证干预方法</h3>
            <p className="text-gray-600">
              汇集行为干预、教育干预、语言干预、感统干预等国际权威的实证方法。
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-4">🌍</div>
            <h3 className="text-lg font-semibold mb-3">国际资源链接</h3>
            <p className="text-gray-600">
              直接链接到8个国家的政策法规、组织资源和实证研究，保留原文链接。
            </p>
          </div>
        </div>
      </section>

      {/* 支持地区 */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">支持的地区和资源</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { flag: '🇺🇸', name: '美国', desc: 'IDEA法案、IEP制度' },
              { flag: '🇬🇧', name: '英国', desc: 'SEN体系' },
              { flag: '🇯🇵', name: '日本', desc: '特別支援教育' },
              { flag: '🇷🇺', name: '俄罗斯', desc: '苏联教学法' },
              { flag: '🇸🇬', name: '新加坡', desc: '融合教育' },
              { flag: '🇦🇺', name: '澳大利亚', desc: 'NDIS体系' },
              { flag: '🇭🇰', name: '香港', desc: '特殊教育政策' },
              { flag: '🇹🇼', name: '台湾', desc: '特殊教育法' },
            ].map((region) => (
              <div key={region.name} className="p-4 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-2">{region.flag}</div>
                <h3 className="font-semibold mb-1">{region.name}</h3>
                <p className="text-sm text-gray-600">{region.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 发育阶段 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">按发育阶段分类</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { age: '0-3岁', stage: '早期干预', color: 'bg-blue-100' },
            { age: '3-6岁', stage: '学前期', color: 'bg-green-100' },
            { age: '6-12岁', stage: '学龄期', color: 'bg-yellow-100' },
            { age: '12-18岁', stage: '青少年期', color: 'bg-purple-100' },
          ].map((item) => (
            <Link 
              key={item.age}
              href={`/interventions?ageGroup=${item.age}`}
              className={`${item.color} p-6 rounded-lg text-center hover:shadow-lg transition`}
            >
              <h3 className="text-xl font-semibold mb-2">{item.age}</h3>
              <p className="text-gray-700">{item.stage}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">关于本站</h3>
              <p className="text-gray-400 text-sm">
                致力于为特殊教育工作者和家长提供国际权威的实证干预方法。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">快速链接</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/disabilities" className="hover:text-white">障碍类型</Link></li>
                <li><Link href="/interventions" className="hover:text-white">干预方法</Link></li>
                <li><Link href="/cases" className="hover:text-white">案例分享</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">免责声明</h3>
              <p className="text-gray-400 text-sm">
                本网站内容仅供学习交流，不替代专业医学或教育建议。
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Special Education Evidence-Based Intervention Hub. MIT License</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
