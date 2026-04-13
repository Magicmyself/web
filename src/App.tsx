/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Image as ImageIcon, FileText, Info, ChevronLeft, ChevronRight, MessageCircle, Mail, MapPin, Instagram, X, Users, Gamepad2, Sparkles, Ghost, Swords, Crown, Wand2 } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import siteInfo from '../assets/config/site-info.json';
import posters from '../assets/config/posters.json';
import popularIps from '../assets/config/popular-ips.json';
import works from '../assets/config/works.json';
import packages from '../assets/config/packages.json';
import rules from '../assets/config/rules.json';
import members from '../assets/config/members.json';
import contact from '../assets/config/contact.json';
import iconsConfig from '../assets/config/icons.json';

const iconComponents = {
  Sparkles,
  Swords,
  Ghost,
  Crown,
  Wand2,
  Gamepad2,
};

const iconMap = iconsConfig.icons.reduce((map, icon) => {
  map[icon.name] = iconComponents[icon.component as keyof typeof iconComponents];
  return map;
}, {} as Record<string, React.ElementType>);

export default function App() {
  const [currentPoster, setCurrentPoster] = useState(0);
  const [selectedWork, setSelectedWork] = useState<typeof works[0] | null>(null);
  const [visibleWorks, setVisibleWorks] = useState<number>(21);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showMemberSelection, setShowMemberSelection] = useState(false);
  const [showPaymentUpload, setShowPaymentUpload] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    coserName: '',
    shootDate: '',
    character: '',
    packageTitle: ''
  });
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'wechat',
    paymentScreenshot: null as File | null,
    orderNumber: ''
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPoster((prev) => (prev + 1) % posters.length);
    }, siteInfo.carouselInterval);
    return () => clearInterval(timer);
  }, []);

  const nextPoster = () => setCurrentPoster((prev) => (prev + 1) % posters.length);
  const prevPoster = () => setCurrentPoster((prev) => (prev - 1 + posters.length) % posters.length);

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent size={16} /> : null;
  };

  const loadMoreWorks = () => {
    setVisibleWorks(prev => Math.min(prev + 6, works.length));
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-[#2b2d42] selection:bg-primary selection:text-white">
      
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="text-primary" size={28} />
            <span className="font-bold text-xl tracking-wider">{siteInfo.siteName}</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-sm">
            <a href="#gallery" className="hover:text-primary transition-colors">作品展示</a>
            <a href="#pricing" className="hover:text-primary transition-colors">价格表</a>
            <a href="#rules" className="hover:text-primary transition-colors">约单须知</a>
            <a href="#contact" className="bg-primary text-white px-5 py-2 rounded-full hover:bg-primary-hover transition-colors shadow-md shadow-primary/30">
              立即预约
            </a>
          </div>
        </div>
      </nav>

      <section className="relative h-[85vh] w-full overflow-hidden pt-20">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentPoster}
            src={posters[currentPoster].imageUrl}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 flex flex-col items-center justify-center text-white text-center p-6 z-20">
          <motion.div
            key={`text-${currentPoster}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-lg">
              {posters[currentPoster].title}
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-200 drop-shadow-md mb-10">
              {posters[currentPoster].subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#contact" className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-primary/40">
                <MessageCircle size={22} />
                联系企鹅/微信约单
              </a>
              <a href="#gallery" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-2">
                <ImageIcon size={22} />
                浏览作品集
              </a>
            </div>
          </motion.div>
        </div>

        <button onClick={prevPoster} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white flex items-center justify-center transition-colors">
          <ChevronLeft size={28} />
        </button>
        <button onClick={nextPoster} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white flex items-center justify-center transition-colors">
          <ChevronRight size={28} />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {posters.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPoster(idx)}
              className={`w-3 h-3 rounded-full transition-all ${idx === currentPoster ? 'bg-primary w-8' : 'bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </section>

      <section className="bg-white py-6 border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-2 text-gray-500 font-bold shrink-0">
            <Gamepad2 className="text-primary" size={24} />
            <span>常驻拍摄游戏企划：</span>
          </div>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {popularIps.map((ip, idx) => (
              <span key={idx} className="flex items-center gap-1.5 px-4 py-2 bg-pink-50 text-primary rounded-full text-sm font-bold border border-pink-100 hover:bg-primary hover:text-white transition-colors cursor-pointer">
                {getIcon(ip.icon)}
                {ip.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
            <ImageIcon className="text-primary" size={36} />
            近期作品展示
          </h2>
          <p className="text-gray-500">用心记录每一个角色的灵魂，跨越次元的视觉呈现</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.slice(0, visibleWorks).map((work, idx) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedWork(work)}
              className="group relative overflow-hidden rounded-3xl shadow-lg bg-gray-200 cursor-pointer flex items-center justify-center"
            >
              <LazyLoadImage
                src={work.imageUrl}
                alt={work.title}
                effect="blur"
                referrerPolicy="no-referrer"
                className="w-full h-64 object-contain transition-transform duration-700 group-hover:scale-110 mx-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2b2d42]/90 via-[#2b2d42]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold">{work.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        
        {visibleWorks < works.length && (
          <div className="mt-12 text-center">
            <button 
              onClick={loadMoreWorks}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-bold transition-colors"
            >
              查看更多作品
            </button>
          </div>
        )}
      </section>

      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
              <FileText className="text-primary" size={36} />
              拍摄价格表
            </h2>
            <p className="text-gray-500">透明报价，无隐形消费，为您量身定制拍摄方案</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {packages.map((pkg, idx) => {
              // 跳过场照接单，单独处理
              if (pkg.title === '场照接单') return null;
              
              const isSelected = selectedPackage === pkg.title;
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className={`relative bg-[#f8f9fa] rounded-3xl p-8 shadow-xl border-2 transition-transform hover:-translate-y-2 cursor-pointer ${isSelected ? 'border-2 border-primary shadow-primary/20' : pkg.isPopular ? 'border-2 border-primary' : 'border-2 border-transparent'}`}
                  onClick={() => setSelectedPackage(pkg.title)}
                >
                  {pkg.isPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                      最受欢迎
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-bl-3xl text-sm font-bold">
                      已选择
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2 text-center">{pkg.title}</h3>
                  <div className="text-center mb-8">
                    <span className="text-gray-500">¥</span>
                    <span className="text-5xl font-black text-primary">{pkg.price}</span>
                    <span className="text-gray-500"> /套</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    className={`w-full py-4 rounded-xl font-bold transition-colors ${isSelected ? 'bg-primary text-white hover:bg-primary-hover' : pkg.isPopular ? 'bg-primary text-white hover:bg-primary-hover' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setRegistrationData(prev => ({
                        ...prev,
                        packageTitle: pkg.title
                      }));
                      setShowMemberSelection(true);
                    }}
                  >
                    选择此套餐
                  </button>
                </motion.div>
              );
            })}
          </div>
          
          {/* 场照接单横栏布局 */}
          {packages.find(pkg => pkg.title === '场照接单') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              className={`bg-[#f8f9fa] rounded-3xl p-8 shadow-xl border-2 cursor-pointer transition-transform hover:-translate-y-2 ${selectedPackage === '场照接单' ? 'border-2 border-primary shadow-primary/20' : 'border-2 border-transparent'}`}
              onClick={() => setSelectedPackage('场照接单')}
            >
              <h3 className="text-2xl font-bold mb-6 text-center">场照接单</h3>
              <div className="text-center mb-8">
                <span className="text-gray-500">¥</span>
                <span className="text-5xl font-black text-primary">{packages.find(pkg => pkg.title === '场照接单')?.price}</span>
                <span className="text-gray-500"> /套</span>
              </div>
              
              {selectedPackage === '场照接单' && (
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-bl-3xl text-sm font-bold">
                  已选择
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 单人场照 */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h4 className="text-xl font-bold mb-4 text-primary">单人场照</h4>
                  <ul className="space-y-3">
                    {packages.find(pkg => pkg.title === '场照接单')?.features.filter(f => f.includes('单人')).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* 双人场照 */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h4 className="text-xl font-bold mb-4 text-primary">双人场照</h4>
                  <ul className="space-y-3">
                    {packages.find(pkg => pkg.title === '场照接单')?.features.filter(f => f.includes('双人')).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <button 
                className={`w-full mt-8 py-4 rounded-xl font-bold transition-colors ${selectedPackage === '场照接单' ? 'bg-primary text-white hover:bg-primary-hover' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setRegistrationData(prev => ({
                    ...prev,
                    packageTitle: '场照接单'
                  }));
                  setShowMemberSelection(true);
                }}
              >
                选择此套餐
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <section id="rules" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
            <Info className="text-primary" size={36} />
            约单须知
          </h2>
          <p className="text-gray-500">请在预约前仔细阅读以下条款，预约即代表同意</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-gray-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-[#2b2d42] mb-8 flex items-center gap-2">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                付费约单须知
              </h3>
              <ul className="space-y-6">
                {rules.paidRules.map((rule, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-pink-50 text-primary flex items-center justify-center shrink-0 font-black text-sm border border-pink-100 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{rule}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#2b2d42] mb-8 flex items-center gap-2">
                <span className="w-2 h-8 bg-blue-400 rounded-full"></span>
                长期互勉角色
              </h3>
              <div className="space-y-4">
                {rules.tfpRoles.map((role, idx) => (
                  <div key={idx} className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-start gap-3 transition-colors hover:bg-blue-50">
                    <Sparkles className="text-blue-400 shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700 font-medium leading-relaxed">{role}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#2b2d42] mb-8 flex items-center gap-2">
                <span className="w-2 h-8 bg-purple-400 rounded-full"></span>
                互勉须知
              </h3>
              <ul className="space-y-6">
                {rules.tfpRules.map((rule, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center shrink-0 font-black text-sm border border-purple-100 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{rule}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="team" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
              <Users className="text-primary" size={36} />
              团队成员
            </h2>
            <p className="text-gray-500">专业团队，用心服务每一个细节</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {members.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#f8f9fa] rounded-3xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <LazyLoadImage
                  src={member.avatarUrl}
                  alt={member.name}
                  effect="blur"
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md"
                />
                <h3 className="text-lg font-bold text-[#2b2d42] mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
              <Mail className="text-primary" size={36} />
              联系我们
            </h2>
            <p className="text-gray-500">期待与您的合作，共同创造美好回忆</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-primary" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">QQ</h3>
              <p className="text-gray-600">{contact.qq}</p>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-primary" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">微信</h3>
              <p className="text-gray-600">{contact.wechat}</p>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-primary" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">邮箱</h3>
              <p className="text-gray-600">{contact.email}</p>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-primary" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">地址</h3>
              <p className="text-gray-600">{contact.address}</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-6 text-gray-700">关注我们</h3>
            <div className="flex justify-center gap-4">
              <a href={contact.socialMedia.weibo} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-gray-600 hover:text-primary">
                <Instagram size={24} />
              </a>
              <a href={contact.socialMedia.xiaohongshu} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-gray-600 hover:text-primary">
                <Instagram size={24} />
              </a>
              <a href={contact.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow text-gray-600 hover:text-primary">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#2b2d42] text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">{contact.copyright}</p>
        </div>
      </footer>

      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedWork(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full bg-white rounded-3xl overflow-hidden max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-shrink-0">
                <img 
                  src={selectedWork.imageUrl} 
                  alt={selectedWork.title}
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[70vh] object-contain"
                />
                <button 
                  onClick={() => setSelectedWork(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 flex-shrink-0">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4">
                  {selectedWork.category}
                </span>
                <h3 className="text-3xl font-black text-[#2b2d42] mb-4">{selectedWork.title}</h3>
                <p className="text-gray-600 leading-relaxed">{selectedWork.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {showRegistrationForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setShowRegistrationForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-2xl w-full bg-white rounded-3xl overflow-y-auto max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-[#2b2d42]">登记信息</h3>
                  <button 
                    onClick={() => setShowRegistrationForm(false)}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">选择的套餐</label>
                    <input 
                      type="text" 
                      value={registrationData.packageTitle}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Coser名字 (CN)</label>
                    <input 
                      type="text" 
                      value={registrationData.coserName}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, coserName: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="请输入Coser名字"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">拍摄时间</label>
                    <input 
                      type="date" 
                      value={registrationData.shootDate}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, shootDate: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">拍摄角色</label>
                    <input 
                      type="text" 
                      value={registrationData.character}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, character: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="请输入拍摄角色"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="button"
                      className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors"
                      onClick={() => {
                        setShowRegistrationForm(false);
                        setShowMemberSelection(true);
                      }}
                    >
                      下一步：选择团队成员
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {showMemberSelection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setShowMemberSelection(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full bg-white rounded-3xl overflow-y-auto max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-[#2b2d42]">选择团队成员</h3>
                  <button 
                    onClick={() => setShowMemberSelection(false)}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="overflow-x-auto pb-4">
                  <div className="flex gap-4 min-w-max">
                    {members.map((member) => (
                      <motion.div
                        key={member.id}
                        whileHover={{ scale: 1.05 }}
                        className={`flex-shrink-0 w-48 bg-[#f8f9fa] rounded-2xl p-4 text-center cursor-pointer transition-all ${selectedMember?.id === member.id ? 'border-2 border-primary shadow-primary/20' : 'border border-transparent'}`}
                        onClick={() => setSelectedMember(member)}
                      >
                        <LazyLoadImage
                          src={member.avatarUrl}
                          alt={member.name}
                          effect="blur"
                          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md"
                        />
                        <h4 className="font-bold text-lg mb-1">{member.name}</h4>
                        <p className="text-sm text-primary mb-2">{member.role}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8">
                  <button 
                    type="button"
                    className={`w-full py-4 font-bold rounded-xl transition-colors ${selectedMember ? 'bg-primary text-white hover:bg-primary-hover' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                    onClick={() => {
                      if (selectedMember) {
                        setShowMemberSelection(false);
                        setShowPaymentUpload(true);
                      }
                    }}
                    disabled={!selectedMember}
                  >
                    下一步：查看收款码
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {showPaymentUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setShowPaymentUpload(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-2xl w-full bg-white rounded-3xl overflow-y-auto max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-[#2b2d42]">选择团队成员</h3>
                  <button 
                    onClick={() => setShowPaymentUpload(false)}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                {selectedMember && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h4 className="text-xl font-bold mb-2">{selectedMember.name}</h4>
                      <p className="text-primary font-medium">{selectedMember.role}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h5 className="text-lg font-bold mb-4">收款码</h5>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border-2 border-gray-200 rounded-xl p-4 text-center">
                          <h6 className="font-medium mb-2">微信支付</h6>
                          <div className="h-48 bg-white rounded-lg flex items-center justify-center">
                            <img 
                              src={`/assets/images/members/payment/${selectedMember.name.toLowerCase()}_wechat.jpg`} 
                              alt="微信支付"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200?text=微信二维码';
                              }}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        </div>
                        <div className="border-2 border-gray-200 rounded-xl p-4 text-center">
                          <h6 className="font-medium mb-2">支付宝</h6>
                          <div className="h-48 bg-white rounded-lg flex items-center justify-center">
                            <img 
                              src={`/assets/images/members/payment/${selectedMember.name.toLowerCase()}_alipay.jpg`} 
                              alt="支付宝"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200?text=支付宝二维码';
                              }}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h5 className="text-lg font-bold mb-4">联系方式</h5>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="text-gray-500" size={20} />
                          <span>{selectedMember.email}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                      <p className="text-yellow-700 font-medium">添加摄影老师才可以收到返图哦</p>
                    </div>
                    
                    <div className="pt-4">
                      <button 
                        type="button"
                        className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors"
                        onClick={() => {
                          setShowPaymentUpload(false);
                          setSelectedPackage(null);
                          setSelectedMember(null);
                        }}
                      >
                        完成
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}