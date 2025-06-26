import { Theme } from '../types/theme';

export const themes: Theme[] = [
  {
    id: 'modern-tech',
    name: 'Modern Tech',
    description: 'Thiết kế hiện đại cho công ty công nghệ với màu sắc tươi sáng',
    category: 'landing',
    industry: 'technology',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#06B6D4',
      background: '#FFFFFF',
      text: '#1F2937'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: {
      pages: [
        {
          id: 'home',
          name: 'Trang chủ',
          path: '/',
          isHome: true,
          components: [
            {
              id: 'hero-section',
              type: 'section',
              content: '',
              styles: {
                backgroundColor: '#F8FAFC',
                padding: '80px 24px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '32px'
              },
              children: [
                {
                  id: 'hero-heading',
                  type: 'heading',
                  content: 'Giải pháp công nghệ tiên tiến cho doanh nghiệp',
                  styles: {
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: '#1F2937',
                    textAlign: 'center',
                    margin: '0 0 24px 0'
                  }
                },
                {
                  id: 'hero-text',
                  type: 'text',
                  content: 'Chúng tôi cung cấp các giải pháp công nghệ hiện đại giúp doanh nghiệp của bạn phát triển mạnh mẽ trong kỷ nguyên số.',
                  styles: {
                    fontSize: '20px',
                    color: '#6B7280',
                    textAlign: 'center',
                    margin: '0 0 32px 0',
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }
                },
                {
                  id: 'hero-button',
                  type: 'button',
                  content: 'Khám phá ngay',
                  styles: {
                    backgroundColor: '#3B82F6',
                    color: '#FFFFFF',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer'
                  }
                }
              ]
            }
          ]
        }
      ],
      navigation: [
        { id: 'nav-home', label: 'Trang chủ', pageId: 'home', order: 0 }
      ]
    }
  },
  {
    id: 'fashion-boutique',
    name: 'Fashion Boutique',
    description: 'Theme sang trọng cho cửa hàng thời trang và phụ kiện',
    category: 'ecommerce',
    industry: 'fashion',
    thumbnail: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: {
      primary: '#EC4899',
      secondary: '#BE185D',
      accent: '#F97316',
      background: '#FDF2F8',
      text: '#1F2937'
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter'
    },
    layout: {
      pages: [
        {
          id: 'home',
          name: 'Trang chủ',
          path: '/',
          isHome: true,
          components: [
            {
              id: 'hero-section',
              type: 'section',
              content: '',
              styles: {
                backgroundColor: '#FDF2F8',
                padding: '100px 24px',
                textAlign: 'center',
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '40px'
              },
              children: [
                {
                  id: 'hero-heading',
                  type: 'heading',
                  content: 'Thời Trang Đẳng Cấp',
                  styles: {
                    fontSize: '56px',
                    fontWeight: 'bold',
                    color: '#BE185D',
                    textAlign: 'center',
                    fontFamily: 'Playfair Display',
                    margin: '0 0 24px 0'
                  }
                },
                {
                  id: 'hero-text',
                  type: 'text',
                  content: 'Khám phá bộ sưu tập thời trang cao cấp với phong cách hiện đại và tinh tế',
                  styles: {
                    fontSize: '22px',
                    color: '#6B7280',
                    textAlign: 'center',
                    margin: '0 0 40px 0',
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }
                },
                {
                  id: 'hero-button',
                  type: 'button',
                  content: 'Mua sắm ngay',
                  styles: {
                    backgroundColor: '#EC4899',
                    color: '#FFFFFF',
                    padding: '18px 36px',
                    borderRadius: '50px',
                    fontSize: '18px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer'
                  }
                }
              ]
            },
            {
              id: 'featured-section',
              type: 'section',
              content: '',
              styles: {
                backgroundColor: '#FFFFFF',
                padding: '80px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '48px'
              },
              children: [
                {
                  id: 'featured-heading',
                  type: 'heading',
                  content: 'Sản phẩm nổi bật',
                  styles: {
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: '#1F2937',
                    textAlign: 'center',
                    fontFamily: 'Playfair Display',
                    margin: '0 0 48px 0'
                  }
                },
                {
                  id: 'products-grid',
                  type: 'container',
                  content: '',
                  styles: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '32px',
                    maxWidth: '1200px',
                    margin: '0 auto'
                  },
                  children: [
                    {
                      id: 'product-1',
                      type: 'container',
                      content: '',
                      styles: {
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s ease'
                      },
                      children: [
                        {
                          id: 'product-1-image',
                          type: 'image',
                          content: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=400',
                          styles: {
                            width: '100%',
                            height: '300px',
                            objectFit: 'cover'
                          }
                        },
                        {
                          id: 'product-1-info',
                          type: 'container',
                          content: '',
                          styles: {
                            padding: '24px'
                          },
                          children: [
                            {
                              id: 'product-1-name',
                              type: 'heading',
                              content: 'Váy Dạ Hội Sang Trọng',
                              styles: {
                                fontSize: '20px',
                                fontWeight: '600',
                                color: '#1F2937',
                                margin: '0 0 8px 0'
                              }
                            },
                            {
                              id: 'product-1-price',
                              type: 'text',
                              content: '2.500.000 VNĐ',
                              styles: {
                                fontSize: '18px',
                                color: '#EC4899',
                                fontWeight: '600'
                              }
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      navigation: [
        { id: 'nav-home', label: 'Trang chủ', pageId: 'home', order: 0 }
      ]
    }
  },
  {
    id: 'luxury-store',
    name: 'Luxury Store',
    description: 'Theme cao cấp cho cửa hàng hàng hiệu và sản phẩm luxury',
    category: 'ecommerce',
    industry: 'fashion',
    thumbnail: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: {
      primary: '#000000',
      secondary: '#374151',
      accent: '#D4AF37',
      background: '#FFFFFF',
      text: '#1F2937'
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter'
    },
    layout: {
      pages: [
        {
          id: 'home',
          name: 'Trang chủ',
          path: '/',
          isHome: true,
          components: [
            {
              id: 'hero-section',
              type: 'section',
              content: '',
              styles: {
                backgroundColor: '#000000',
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '120px 24px',
                textAlign: 'center',
                color: '#FFFFFF',
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '32px'
              },
              children: [
                {
                  id: 'hero-heading',
                  type: 'heading',
                  content: 'LUXURY COLLECTION',
                  styles: {
                    fontSize: '52px',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    textAlign: 'center',
                    fontFamily: 'Playfair Display',
                    margin: '0 0 24px 0',
                    letterSpacing: '2px'
                  }
                },
                {
                  id: 'hero-text',
                  type: 'text',
                  content: 'Trải nghiệm đẳng cấp với những sản phẩm cao cấp được tuyển chọn kỹ lưỡng',
                  styles: {
                    fontSize: '20px',
                    color: '#F3F4F6',
                    textAlign: 'center',
                    margin: '0 0 40px 0',
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }
                },
                {
                  id: 'hero-button',
                  type: 'button',
                  content: 'KHÁM PHÁ BỘ SƯU TẬP',
                  styles: {
                    backgroundColor: 'transparent',
                    color: '#D4AF37',
                    padding: '18px 36px',
                    borderRadius: '0px',
                    fontSize: '16px',
                    fontWeight: '600',
                    border: '2px solid #D4AF37',
                    cursor: 'pointer',
                    letterSpacing: '1px'
                  }
                }
              ]
            }
          ]
        }
      ],
      navigation: [
        { id: 'nav-home', label: 'Trang chủ', pageId: 'home', order: 0 }
      ]
    }
  },
  {
    id: 'modern-shop',
    name: 'Modern Shop',
    description: 'Theme hiện đại cho cửa hàng online đa dạng sản phẩm',
    category: 'ecommerce',
    industry: 'retail',
    thumbnail: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#F59E0B',
      background: '#F9FAFB',
      text: '#1F2937'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: {
      pages: [
        {
          id: 'home',
          name: 'Trang chủ',
          path: '/',
          isHome: true,
          components: [
            {
              id: 'hero-section',
              type: 'section',
              content: '',
              styles: {
                backgroundColor: '#F9FAFB',
                padding: '80px 24px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '64px',
                alignItems: 'center',
                maxWidth: '1200px',
                margin: '0 auto'
              },
              children: [
                {
                  id: 'hero-content',
                  type: 'container',
                  content: '',
                  styles: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                  },
                  children: [
                    {
                      id: 'hero-heading',
                      type: 'heading',
                      content: 'Mua sắm thông minh, sống tốt hơn',
                      styles: {
                        fontSize: '48px',
                        fontWeight: 'bold',
                        color: '#1F2937',
                        lineHeight: '1.2',
                        margin: '0'
                      }
                    },
                    {
                      id: 'hero-text',
                      type: 'text',
                      content: 'Khám phá hàng ngàn sản phẩm chất lượng với giá cả hợp lý. Giao hàng nhanh chóng, đổi trả dễ dàng.',
                      styles: {
                        fontSize: '18px',
                        color: '#6B7280',
                        lineHeight: '1.6',
                        margin: '0'
                      }
                    },
                    {
                      id: 'hero-button',
                      type: 'button',
                      content: 'Mua sắm ngay',
                      styles: {
                        backgroundColor: '#059669',
                        color: '#FFFFFF',
                        padding: '16px 32px',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer',
                        alignSelf: 'flex-start'
                      }
                    }
                  ]
                },
                {
                  id: 'hero-image',
                  type: 'image',
                  content: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
                  styles: {
                    width: '100%',
                    height: '400px',
                    borderRadius: '16px',
                    objectFit: 'cover'
                  }
                }
              ]
            }
          ]
        }
      ],
      navigation: [
        { id: 'nav-home', label: 'Trang chủ', pageId: 'home', order: 0 }
      ]
    }
  },
  {
    id: 'beauty-cosmetics',
    name: 'Beauty & Cosmetics',
    description: 'Theme dành cho cửa hàng mỹ phẩm và làm đẹp',
    category: 'ecommerce',
    industry: 'beauty',
    thumbnail: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: {
      primary: '#F472B6',
      secondary: '#EC4899',
      accent: '#A855F7',
      background: '#FEF7FF',
      text: '#1F2937'
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter'
    },
    layout: {
      pages: [
        {
          id: 'home',
          name: 'Trang chủ',
          path: '/',
          isHome: true,
          components: [
            {
              id: 'hero-section',
              type: 'section',
              content: '',
              styles: {
                backgroundColor: '#FEF7FF',
                padding: '100px 24px',
                textAlign: 'center',
                minHeight: '70vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '32px'
              },
              children: [
                {
                  id: 'hero-heading',
                  type: 'heading',
                  content: 'Vẻ Đẹp Tự Nhiên',
                  styles: {
                    fontSize: '52px',
                    fontWeight: 'bold',
                    color: '#EC4899',
                    textAlign: 'center',
                    fontFamily: 'Playfair Display',
                    margin: '0 0 24px 0'
                  }
                },
                {
                  id: 'hero-text',
                  type: 'text',
                  content: 'Khám phá bộ sưu tập mỹ phẩm cao cấp từ thiên nhiên, an toàn cho mọi loại da',
                  styles: {
                    fontSize: '20px',
                    color: '#6B7280',
                    textAlign: 'center',
                    margin: '0 0 40px 0',
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }
                },
                {
                  id: 'hero-button',
                  type: 'button',
                  content: 'Khám phá ngay',
                  styles: {
                    backgroundColor: '#F472B6',
                    color: '#FFFFFF',
                    padding: '18px 36px',
                    borderRadius: '25px',
                    fontSize: '18px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer'
                  }
                }
              ]
            }
          ]
        }
      ],
      navigation: [
        { id: 'nav-home', label: 'Trang chủ', pageId: 'home', order: 0 }
      ]
    }
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    description: 'Portfolio sáng tạo cho designer và nghệ sĩ',
    category: 'portfolio',
    industry: 'creative',
    thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: {
      primary: '#8B5CF6',
      secondary: '#A855F7',
      accent: '#EC4899',
      background: '#FAFAFA',
      text: '#1F2937'
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter'
    },
    layout: {
      pages: [
        {
          id: 'home',
          name: 'Trang chủ',
          path: '/',
          isHome: true,
          components: [
            {
              id: 'hero-section',
              type: 'section',
              content: '',
              styles: {
                backgroundColor: '#FAFAFA',
                padding: '100px 24px',
                textAlign: 'center',
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '32px'
              },
              children: [
                {
                  id: 'hero-heading',
                  type: 'heading',
                  content: 'Tôi là Designer Sáng Tạo',
                  styles: {
                    fontSize: '56px',
                    fontWeight: 'bold',
                    color: '#1F2937',
                    textAlign: 'center',
                    fontFamily: 'Playfair Display',
                    margin: '0 0 24px 0'
                  }
                },
                {
                  id: 'hero-text',
                  type: 'text',
                  content: 'Tạo ra những trải nghiệm thị giác độc đáo và ấn tượng thông qua thiết kế',
                  styles: {
                    fontSize: '22px',
                    color: '#6B7280',
                    textAlign: 'center',
                    margin: '0 0 40px 0',
                    maxWidth: '500px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }
                },
                {
                  id: 'hero-button',
                  type: 'button',
                  content: 'Xem Portfolio',
                  styles: {
                    backgroundColor: '#8B5CF6',
                    color: '#FFFFFF',
                    padding: '18px 36px',
                    borderRadius: '50px',
                    fontSize: '18px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer'
                  }
                }
              ]
            }
          ]
        }
      ],
      navigation: [
        { id: 'nav-home', label: 'Trang chủ', pageId: 'home', order: 0 }
      ]
    }
  },
  {
    id: 'restaurant-deluxe',
    name: 'Restaurant Deluxe',
    description: 'Theme sang trọng cho nhà hàng và quán ăn',
    category: 'business',
    industry: 'food',
    thumbnail: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: {
      primary: '#D97706',
      secondary: '#92400E',
      accent: '#F59E0B',
      background: '#FFFBEB',
      text: '#1C1917'
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter'
    },
    layout: {
      pages: [
        {
          id: 'home',
          name: 'Trang chủ',
          path: '/',
          isHome: true,
          components: [
            {
              id: 'hero-section',
              type: 'section',
              content: '',
              styles: {
                backgroundColor: '#1C1917',
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '120px 24px',
                textAlign: 'center',
                color: '#FFFFFF',
                minHeight: '70vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '32px'
              },
              children: [
                {
                  id: 'hero-heading',
                  type: 'heading',
                  content: 'Nhà Hàng Deluxe',
                  styles: {
                    fontSize: '52px',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    textAlign: 'center',
                    fontFamily: 'Playfair Display',
                    margin: '0 0 24px 0',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                  }
                },
                {
                  id: 'hero-text',
                  type: 'text',
                  content: 'Trải nghiệm ẩm thực tinh tế với những món ăn được chế biến từ nguyên liệu tươi ngon nhất',
                  styles: {
                    fontSize: '20px',
                    color: '#F3F4F6',
                    textAlign: 'center',
                    margin: '0 0 40px 0',
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }
                },
                {
                  id: 'hero-button',
                  type: 'button',
                  content: 'Đặt bàn ngay',
                  styles: {
                    backgroundColor: '#D97706',
                    color: '#FFFFFF',
                    padding: '18px 36px',
                    borderRadius: '8px',
                    fontSize: '18px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer'
                  }
                }
              ]
            }
          ]
        }
      ],
      navigation: [
        { id: 'nav-home', label: 'Trang chủ', pageId: 'home', order: 0 }
      ]
    }
  },
  {
    id: 'minimal-business',
    name: 'Minimal Business',
    description: 'Thiết kế tối giản cho doanh nghiệp chuyên nghiệp',
    category: 'business',
    industry: 'corporate',
    thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    colors: {
      primary: '#1F2937',
      secondary: '#374151',
      accent: '#3B82F6',
      background: '#FFFFFF',
      text: '#1F2937'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: {
      pages: [
        {
          id: 'home',
          name: 'Trang chủ',
          path: '/',
          isHome: true,
          components: [
            {
              id: 'hero-section',
              type: 'section',
              content: '',
              styles: {
                backgroundColor: '#FFFFFF',
                padding: '100px 24px',
                textAlign: 'left',
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '64px',
                alignItems: 'center'
              },
              children: [
                {
                  id: 'hero-content',
                  type: 'container',
                  content: '',
                  styles: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                  },
                  children: [
                    {
                      id: 'hero-heading',
                      type: 'heading',
                      content: 'Giải pháp kinh doanh hiệu quả',
                      styles: {
                        fontSize: '48px',
                        fontWeight: 'bold',
                        color: '#1F2937',
                        lineHeight: '1.2',
                        margin: '0'
                      }
                    },
                    {
                      id: 'hero-text',
                      type: 'text',
                      content: 'Chúng tôi cung cấp các giải pháp kinh doanh toàn diện giúp doanh nghiệp của bạn tăng trưởng bền vững.',
                      styles: {
                        fontSize: '18px',
                        color: '#6B7280',
                        lineHeight: '1.6',
                        margin: '0'
                      }
                    },
                    {
                      id: 'hero-button',
                      type: 'button',
                      content: 'Tìm hiểu thêm',
                      styles: {
                        backgroundColor: '#3B82F6',
                        color: '#FFFFFF',
                        padding: '16px 32px',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer',
                        alignSelf: 'flex-start'
                      }
                    }
                  ]
                },
                {
                  id: 'hero-image',
                  type: 'image',
                  content: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
                  styles: {
                    width: '100%',
                    height: '400px',
                    borderRadius: '12px',
                    objectFit: 'cover'
                  }
                }
              ]
            }
          ]
        }
      ],
      navigation: [
        { id: 'nav-home', label: 'Trang chủ', pageId: 'home', order: 0 }
      ]
    }
  }
];

export const themeCategories = [
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Trang đích cho marketing và bán hàng',
    icon: '🚀'
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Showcase công việc và dự án',
    icon: '🎨'
  },
  {
    id: 'business',
    name: 'Doanh nghiệp',
    description: 'Website cho công ty và tổ chức',
    icon: '🏢'
  },
  {
    id: 'blog',
    name: 'Blog',
    description: 'Trang blog và tin tức',
    icon: '📝'
  },
  {
    id: 'ecommerce',
    name: 'Thương mại điện tử',
    description: 'Cửa hàng trực tuyến',
    icon: '🛒'
  },
  {
    id: 'restaurant',
    name: 'Nhà hàng',
    description: 'Website cho nhà hàng và quán ăn',
    icon: '🍽️'
  }
];