import re

def main():
    try:
        # Task 1: Update content_data.js
        with open('content_data.js', 'r', encoding='utf-8') as f:
            content = f.read()

        # Update Islamiyat Baab 1:
        content = content.replace(
            '"باب اول: قرآن مجید و حدیث نبوی ﷺ": {',
            '"باب اول: قرآن مجید و حدیث نبوی ﷺ": {\n      "slug": "bab-1-quran-o-hadees",'
        )
        content = content.replace(
            '"باب دوم: ایمانیات و عبادات": {',
            '"باب دوم: ایمانیات و عبادات": {\n      "slug": "bab-2-emaniyat-o-ibadaat",'
        )
        content = content.replace(
            '"باب سوم: سیرتِ نبوی ﷺ": {',
            '"باب سوم: سیرتِ نبوی ﷺ": {\n      "slug": "bab-3-seerat-e-nabvi",'
        )
        content = content.replace(
            '"باب چہارم: اخلاق و آداب": {',
            '"باب چہارم: اخلاق و آداب": {\n      "slug": "bab-4-akhlaq-o-aadab",'
        )
        content = content.replace(
            '"باب پنجم: حُسنِ معاملات و معاشرت": {',
            '"باب پنجم: حُسنِ معاملات و معاشرت": {\n      "slug": "bab-5-husn-e-mamlat",'
        )
        content = content.replace(
            '"باب ششم: ہدایت کے سرچشمے اور مشاہیرِ اسلام": {',
            '"باب ششم: ہدایت کے سرچشمے اور مشاہیرِ اسلام": {\n      "slug": "bab-6-hidayat-ke-sarchashme",'
        )
        content = content.replace(
            '"باب ہفتم: اسلامی تعلیمات اور عصرِ حاضر کے تقاضے": {',
            '"باب ہفتم: اسلامی تعلیمات اور عصرِ حاضر کے تقاضے": {\n      "slug": "bab-7-islami-taleemat",'
        )

        with open('content_data.js', 'w', encoding='utf-8') as f:
            f.write(content)

        # Task 2: Update script.js
        with open('script.js', 'r', encoding='utf-8') as f:
            script_content = f.read()

        # Fallback slug generator
        script_content = re.sub(
            r'const slugifyRouteSegment\s*=\s*\(value\)\s*=>\s*\{.*?return safeStr;\n\s*\};',
            '''const slugifyRouteSegment = (value) => {
        let safeStr = String(value || '').toLowerCase().trim();
        safeStr = safeStr.replace(/[^a-z0-9\\s-\\u0600-\\u06FF]/g, '');
        safeStr = safeStr.replace(/\\s+/g, '-');
        safeStr = safeStr.replace(/-+/g, '-');
        
        if (!safeStr || safeStr === '-') {
            // fallback to a hash or chapter string if empty to avoid broken routes
            let hash = 0;
            for (let i = 0; i < String(value).length; i++) hash = ((hash << 5) - hash) + String(value).charCodeAt(i);
            return 'chapter-' + Math.abs(hash).toString(36);
        }
        return safeStr;
    };''', script_content, flags=re.DOTALL
        )

        with open('script.js', 'w', encoding='utf-8') as f:
            f.write(script_content)

        # Bump versions
        with open('index.html', 'r', encoding='utf-8') as f:
            html = f.read()
        
        html = re.sub(r'content_data\.js\?v=\d+\.\d+\.\d+', 'content_data.js?v=1.0.4', html)
        html = re.sub(r'script\.js\?v=\d+\.\d+\.\d+', 'script.js?v=1.0.4', html)

        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(html)
            
        print("Done")

    except Exception as e:
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    main()