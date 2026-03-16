import re

content = open('index.html', encoding='utf-8').read()

m1 = re.search(r'id=["\']tab-most-important["\']', content)
m2 = re.search(r'id=["\']tab-important["\']', content)
m3 = re.search(r'id=["\']tab-conceptual["\']', content)

p1 = m1.start() if m1 else -1
p2 = m2.start() if m2 else -1
p3 = m3.start() if m3 else -1

print('Positions:', p1, p2, p3)

if p1 != -1 and p2 != -1 and p3 != -1:
    t1_t2 = content[p1:p2]
    t2_t3 = content[p2:p3]
    print('T1-T2 divs:', t1_t2.count('<div') - t1_t2.count('</div'))
    print('T2-T3 divs:', t2_t3.count('<div') - t2_t3.count('</div'))
    
    # Also print the end of T2
    print("End of T2:\n", content[p3-200:p3])
