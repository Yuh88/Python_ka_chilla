import re

with open('script.js','r+',encoding='utf8') as f:
    c = f.read()

    pattern = r"// Save baab ID before pushing topic\s*const currentState = buildNavState\('chapters', 'Islamiyat', null, activeIslamiyatBaabId\);\s*history\.replaceState\(currentState, '', getRoutePathFromState\(currentState\)\);\s*navigateToState\(buildNavState\('content', subject, chapter\), 'forward'\);"
    
    replacement = """if (subject === 'Islamiyat') {
                                    const currentState = buildNavState('chapters', 'Islamiyat', null, activeIslamiyatBaabId);
                                    history.replaceState(currentState, '', getRoutePathFromState(currentState));
                                }
                                navigateToState(buildNavState('content', subject, chapter), 'forward');"""

    c = re.sub(pattern, replacement, c)
    f.seek(0)
    f.write(c)
    f.truncate()
    print("Done")
