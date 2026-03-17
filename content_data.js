const siteData = {
  "Computer Science": {
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": [],
    "6": [],
    "7": [],
    "8": [],
    "9": []
  },
  "English": {
    "1": [],
    "2": [],
    "3": [],
    "5": [],
    "6": [],
    "8": [],
    "10": [],
    "11": [],
    "13": [],
    "14": []
  },
  "Physics": {
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": [],
    "6": [],
    "7": [],
    "8": [],
    "9": [
      {
        "question": "State Coulomb's law.",
        "answer": "It states that the *force between two-point charges* is directly proportional to the product of the magnitudes of charges and inversely proportional to the square of the distance between them.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$F=k\\frac{q_{1}q_{2}}{r^{2}}$"
      },
      {
        "question": "Define electric intensity.",
        "answer": "The electric intensity of the field or simply electric field at any point is defined as the *force experienced by a unit positive charge* placed at that point.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$E=\\frac{F}{q}$"
      },
      {
        "question": "What is electric flux?",
        "answer": "The *number of the field lines* passing through a certain element of area is known as electric flux through that area.",
        "category": "most",
        "badgeTitle": "SI UNIT",
        "badgeText": "$N~m^{2}C^{-1}$"
      },
      {
        "question": "State Gauss's law.",
        "answer": "The *total electric flux* through any closed surface is $1/\\epsilon_{0}$ times the total charge enclosed in it.",
        "category": "most",
        "badgeTitle": "MATHEMATICAL FORM",
        "badgeText": "$\\phi_{e}=\\frac{1}{\\epsilon_{0}}\\times Q$"
      },
      {
        "question": "Define electric potential difference.",
        "answer": "The potential difference between two points A and B in an electric field is defined as the *work done* in carrying a unit positive charge from A to B while keeping the charge in equilibrium.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$\\Delta V=\\frac{W_{AB}}{q}$"
      },
      {
        "question": "What is meant by electric potential at a point?",
        "answer": "The electric potential at any point in an electric field is equal to the *work done* in bringing a unit positive charge from infinity to that point keeping it in equilibrium.",
        "category": "most",
        "badgeTitle": "KEY POINT",
        "badgeText": "The potential at a point is always relative to the potential at infinity, where it is typically assigned a value of zero."
      },
      {
        "question": "Define electron-volt (eV).",
        "answer": "It is defined as the *amount of energy acquired or lost* by an electron as it traverses a potential difference of one volt.",
        "category": "most",
        "badgeTitle": "VALUE",
        "badgeText": "$1eV=1.6\\times10^{-19}J$"
      },
      {
        "question": "What is a potential gradient?",
        "answer": "The quantity $\\Delta V/\\Delta d$ gives the maximum value of the rate of change of potential with distance; this is known as the *potential gradient*.",
        "category": "most",
        "badgeTitle": "RELATION",
        "badgeText": "The electric intensity is equal to the negative of the gradient of potential ($E=-\\frac{\\Delta V}{\\Delta d}$)."
      },
      {
        "question": "What is conventional current?",
        "answer": "Conventional current is the *hypothetical flow of positive charges* that would have the same effect in the circuit as the flow of negative charges that actually does occur.",
        "category": "most",
        "badgeTitle": "DIRECTION",
        "badgeText": "It always flows from a point of higher potential (positive terminal) towards a point of lower potential (negative terminal)."
      },
      {
        "question": "State Ohm's Law.",
        "answer": "The *current flowing* through a conductor is directly proportional to the potential difference applied across the conductor, provided there is no charge in the physical state of the conductor.",
        "category": "most",
        "badgeTitle": "EQUATION",
        "badgeText": "$V=IR$"
      },
      {
        "question": "Define resistivity of a material.",
        "answer": "Resistivity (or specific resistance) is defined as the *resistance of a metre cube* of a material.",
        "category": "most",
        "badgeTitle": "SI UNIT",
        "badgeText": "ohm-metre ($\\Omega m$)"
      },
      {
        "question": "Differentiate between conductance and conductivity.",
        "answer": "*Conductance* is the reciprocal of resistance ($G=\\frac{1}{R}$), while *conductivity* ($\\sigma$) is the reciprocal of resistivity ($\\sigma=\\frac{1}{\\rho}$).",
        "category": "most",
        "badgeTitle": "SI UNITS",
        "badgeText": "The SI unit of conductivity is $ohm^{-1}m^{-1}$ or $mho~m^{-1}$."
      },
      {
        "question": "What is electromotive force (EMF)?",
        "answer": "The emf $E$ of a source is defined as the *energy supplied to unit charge* by the cell to compel it to go to the point of high potential.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$E=\\frac{W}{Q}$"
      },
      {
        "question": "How does EMF differ from potential difference in terms of cause and effect?",
        "answer": "The *emf is the \"cause\"* and potential difference is its \"effect\".",
        "category": "most",
        "badgeTitle": "KEY POINT",
        "badgeText": "EMF is always present even when no current is drawn through the battery, but the potential difference across a conductor is zero when no current flows through it."
      },
      {
        "question": "State Kirchhoff's First Rule.",
        "answer": "It states that the *sum of all the currents* meeting at a point in the circuit is zero ($\\Sigma I=0$).",
        "category": "most",
        "badgeTitle": "CONSERVATION LAW",
        "badgeText": "It is a manifestation of the law of conservation of charge."
      },
      {
        "question": "State Kirchhoff's Second Rule.",
        "answer": "It states that the *algebraic sum of potential changes* (or voltage changes) in a closed circuit or a loop must be equal to zero.",
        "category": "most",
        "badgeTitle": "CONSERVATION LAW",
        "badgeText": "This rule is simply a particular way of stating the law of conservation of energy in electrical problems."
      },
      {
        "question": "What is a Wheatstone Bridge used for?",
        "answer": "A Wheatstone bridge is an electric circuit used to *determine an unknown resistance* when three other adjustable resistances are known.",
        "category": "most",
        "badgeTitle": "BALANCING CONDITION",
        "badgeText": "It is balanced when no current flows through the galvanometer, given by the ratio $\\frac{R_{1}}{R_{2}}=\\frac{R_{3}}{R_{4}}$."
      },
      {
        "question": "What is a potentiometer and its main use?",
        "answer": "A potentiometer is a simple instrument that works on the principle of a Wheatstone Bridge and is mainly used to *measure and compare potential differences accurately* and to find the value of an unknown resistance.",
        "category": "most",
        "badgeTitle": "KEY ADVANTAGE",
        "badgeText": "It determines the unknown emf when no current is drawn from it, making it one of the most accurate methods."
      },
      {
        "question": "What are thermistors?",
        "answer": "A thermistor is a *heat sensitive resistor*, mostly having a negative temperature coefficient of resistance, meaning its resistance decreases when temperature increases.",
        "category": "most",
        "badgeTitle": "COMPOSITION",
        "badgeText": "They are made by heating under high pressure semiconductor ceramic made from mixtures of metallic oxides like manganese, nickel, cobalt, etc."
      },
      {
        "question": "What is a Light Dependent Resistor (LDR)?",
        "answer": "A Light dependent resistor (LDR) is a resistor whose *resistance decreases with increasing light intensity*.",
        "category": "most",
        "badgeTitle": "MATERIAL",
        "badgeText": "They are typically made from semiconductor material like cadmium sulphide deposited on an insulating plate."
      },
      {
        "question": "What is the effect of a dielectric medium on the electrostatic force between two charges?",
        "answer": "The presence of a dielectric always *reduces the electrostatic force* as compared with that in free space by a certain constant factor.",
        "category": "most",
        "badgeTitle": "CONSTANT NAME",
        "badgeText": "relative permittivity ($\\epsilon_{r}$)"
      },
      {
        "question": "Prove that Coulomb's force is a mutual force.",
        "answer": "If charge $q_{1}$ exerts a force on $q_{2}$, then $q_{2}$ also exerts an *equal and opposite force* on $q_{1}$.",
        "category": "most",
        "badgeTitle": "VECTOR EQUATION",
        "badgeText": "$F_{12} = -F_{21}$"
      },
      {
        "question": "Define relative permittivity ($\\epsilon_{r}$).",
        "answer": "It is the *constant factor* for a given dielectric by which the *electrostatic force is reduced* when the insulator is placed between two charges.",
        "category": "most",
        "badgeTitle": "VALUE FOR AIR",
        "badgeText": "1.0006"
      },
      {
        "question": "Under what condition is the electric flux through a surface maximum?",
        "answer": "The electric flux is maximum when the area element is held *perpendicular to the electric field lines*.",
        "category": "most",
        "badgeTitle": "ANGLE CONDITION",
        "badgeText": "Here, the vector area $A$ is parallel to $E$, so $\\theta = 0^{\\circ}$ and $\\phi_{e} = EA \\cos(0^{\\circ}) = EA$."
      },
      {
        "question": "When will the electric flux through a surface be zero?",
        "answer": "The electric flux is zero when the area is held *parallel to the electric field lines*, meaning no lines cross the area.",
        "category": "most",
        "badgeTitle": "ANGLE CONDITION",
        "badgeText": "The angle between field $E$ and vector area $A$ is $90^{\\circ}$, so flux is zero ($EA = 0$)."
      },
      {
        "question": "Does the total electric flux through a closed surface depend on its shape or geometry?",
        "answer": "No, the total flux through a closed surface *does not depend upon the shape or geometry* of the closed surface.",
        "category": "most",
        "badgeTitle": "DEPENDENCE",
        "badgeText": "It only depends upon the medium and the charge enclosed."
      },
      {
        "question": "What is a Gaussian surface?",
        "answer": "A Gaussian surface is an *imaginary closed surface* considered which passes through the point at which the electric intensity is to be evaluated.",
        "category": "most",
        "badgeTitle": "PURPOSE",
        "badgeText": "Its choice is such that the flux through it can be easily evaluated to apply Gauss's law."
      },
      {
        "question": "Define 1 volt.",
        "answer": "A potential difference of 1 volt exists between two points if *work done* in moving a 1 coulomb positive charge from one point to the other, keeping equilibrium, is *one joule*.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$1\\text{ volt} = \\frac{1\\text{ joule}}{1\\text{ coulomb}}$"
      },
      {
        "question": "Prove that $1 V m^{-1} = 1 N C^{-1}$.",
        "answer": "The unit of electric intensity, volt/metre, is *mathematically equivalent* to newton/coulomb.",
        "category": "most",
        "badgeTitle": "DERIVATION",
        "badgeText": "$1\\frac{\\text{volt}}{\\text{metre}} = 1\\frac{\\text{joule/coulomb}}{\\text{metre}} = 1\\frac{\\text{newton} \\times \\text{metre}}{\\text{metre} \\times \\text{coulomb}} = 1 N C^{-1}$"
      },
      {
        "question": "What is drift velocity?",
        "answer": "The *average velocity* acquired by free electrons in the direction opposite to the electric field (-E) due to collisions with the lattice atoms is called drift velocity.",
        "category": "most",
        "badgeTitle": "VALUE",
        "badgeText": "It is of the order of $10^{-3} m s^{-1}$."
      },
      {
        "question": "Why does an electric bulb light up immediately when switched on?",
        "answer": "On turning the switch ON, the disturbance propagates almost instantaneously, and *all free electrons in the circuit start drifting*, pushing their neighboring ones.",
        "category": "most",
        "badgeTitle": "KEY POINT",
        "badgeText": "This causes the electric current to be set up very rapidly, despite the slow drift velocity."
      },
      {
        "question": "Define 1 Ohm ($\\Omega$).",
        "answer": "The resistance of a conductor is 1 ohm if a *current of 1 ampere* flows through it when a potential difference of 1 volt is applied across its ends.",
        "category": "most",
        "badgeTitle": "CONDITION",
        "badgeText": "Provided there is no change in the physical state of the conductor."
      },
      {
        "question": "What is the difference between resistance and resistivity?",
        "answer": "Resistance is the opposition offered by a conductor and is the *characteristic of a particular wire*, depending on its dimensions.",
        "category": "most",
        "badgeTitle": "RESISTIVITY",
        "badgeText": "Resistivity is the property of the material of which the wire is made and is independent of its physical dimensions."
      },
      {
        "question": "Define temperature coefficient of resistance ($\\alpha$).",
        "answer": "The *fractional change in resistance per kelvin* over a considerable range of temperature is known as the temperature coefficient of resistance.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$\\alpha = \\frac{R_{t} - R_{o}}{R_{o}t}$"
      },
      {
        "question": "Why does the resistance of a conductor increase with a rise in temperature?",
        "answer": "As temperature rises, the *amplitude of vibration of the lattice atoms increases*, offering a bigger target for electrons.",
        "category": "most",
        "badgeTitle": "RESULT",
        "badgeText": "This makes collisions between free electrons and atoms more frequent, thus increasing resistance."
      },
      {
        "question": "Name two substances that have a negative temperature coefficient of resistance.",
        "answer": "Substances like *germanium and silicon* have a negative temperature coefficient.",
        "category": "most",
        "badgeTitle": "REASONING",
        "badgeText": "Their resistance decreases with an increase in temperature."
      },
      {
        "question": "Write three formulas for calculating electrical power dissipated in a resistor.",
        "answer": "*Electrical power dissipated* in a resistor can be calculated using different combinations of voltage, current, and resistance.",
        "category": "most",
        "badgeTitle": "EQUATIONS",
        "badgeText": "$P = V \\times I$, $P = I^{2}R$, and $P = V^{2}/R$"
      },
      {
        "question": "What is the internal resistance of a cell?",
        "answer": "The resistance offered by a cell is due to the *electrolyte* present between the two electrodes of the cell and is called its internal resistance ($r$).",
        "category": "most",
        "badgeTitle": "CIRCUIT MODEL",
        "badgeText": "A cell is equivalent to a source of pure emf $E$ with an internal resistance $r$ in series."
      },
      {
        "question": "What is the working principle of a Light Dependent Resistor (LDR)?",
        "answer": "The principle is the *increase in the conductivity* of the semiconductor material on exposing it to light, which frees electrons and decreases resistance.",
        "category": "most",
        "badgeTitle": "BEHAVIOR",
        "badgeText": "In darkness, it has high resistance, but when light photons hit it, resistance drops significantly."
      },
      {
        "question": "State the terminal potential difference formula for a closed circuit.",
        "answer": "When a current $I$ is drawn from a cell, the terminal potential difference $V$ is *less than the EMF $E$ by the potential drop $Ir$* across the internal resistance.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$V = E - Ir$"
      },
      {
        "question": "What is the quantization of charge?",
        "answer": "Any amount of charge $q$ is an *integer multiple* of the elementary charge $e$, meaning charge exists only in discrete packets.",
        "category": "important",
        "badgeTitle": "FORMULA",
        "badgeText": "$q=Ne$ (where $N$ is an integer)"
      },
      {
        "question": "Define \"Electrostatics\" and differentiate it from \"Electric Current\".",
        "answer": "*Electrostatics* is the study of phenomena and properties of electric charges at rest, whereas *electric current* refers to charges in motion.",
        "category": "important",
        "badgeTitle": "KEY POINT",
        "badgeText": "Electrostatics deals with stationary fields, while current involves charge flow."
      },
      {
        "question": "What is the value and SI unit of the permittivity of free space ($\\epsilon_{\\circ}$)?",
        "answer": "The *permittivity of free space* is an electrical constant that describes how an electric field affects a vacuum.",
        "category": "important",
        "badgeTitle": "VALUE",
        "badgeText": "$8.85\\times10^{-12}C^{2}N^{-1}m^{-2}$"
      },
      {
        "question": "Give the value of the Coulomb constant $k$ in SI units for free space.",
        "answer": "The constant of proportionality $k$ depends on the *nature of the medium* and the system of units.",
        "category": "important",
        "badgeTitle": "VALUE",
        "badgeText": "$k=9\\times10^{9}N~m^{2}C^{-2}$"
      },
      {
        "question": "Define \"Volt\" in terms of potential energy change.",
        "answer": "One volt is the potential difference between two points when *one joule of work* is done to move *one coulomb of charge*.",
        "category": "important",
        "badgeTitle": "FORMULA",
        "badgeText": "$1 \\text{ volt} = \\frac{1 \\text{ joule}}{1 \\text{ coulomb}}$"
      },
      {
        "question": "What is the relationship between electric potential energy and potential difference?",
        "answer": "The change in *potential energy* ($\\Delta U$) is equal to the product of the *charge* ($q$) and the *potential difference* ($\\Delta V$).",
        "category": "important",
        "badgeTitle": "EQUATION",
        "badgeText": "$\\Delta U=q\\Delta V$"
      },
      {
        "question": "Why is the electric potential at infinity taken as zero?",
        "answer": "To define electric potential at a specific point, a *reference point* is needed where the potential is *assigned zero*, which is conventionally chosen at infinity.",
        "category": "important",
        "badgeTitle": "KEY POINT",
        "badgeText": "This allows the potential at any point to be measured relative to a fixed baseline."
      },
      {
        "question": "State the SI unit of electric flux and its scalar/vector nature.",
        "answer": "Electric flux is a *scalar quantity* because it is the scalar product of electric field and area.",
        "category": "important",
        "badgeTitle": "SI UNIT",
        "badgeText": "$N~m^{2}C^{-1}$"
      },
      {
        "question": "What is the \"Neutral Zone\" in an electric field pattern?",
        "answer": "It is the middle region between *two identical charges* where the electric field lines seem to repel each other, creating a *zero field spot*.",
        "category": "important",
        "badgeTitle": "DIAGRAM",
        "badgeText": "In Fig 9.7, this is the area where no field lines are present between the charges."
      },
      {
        "question": "What is the physical significance of Kirchhoff's First Rule?",
        "answer": "It is a manifestation of the *law of conservation of charge*, stating that the total charge flowing towards a point must equal the charge flowing away.",
        "category": "important",
        "badgeTitle": "KEY POINT",
        "badgeText": "No charge can be accumulated (sink) or created (source) at a junction."
      },
      {
        "question": "What is the physical significance of Kirchhoff's Second Rule?",
        "answer": "It is a particular way of stating the *law of conservation of energy* for electrical circuits.",
        "category": "important",
        "badgeTitle": "KEY POINT",
        "badgeText": "The total energy gained by a unit charge must equal the total energy dissipated in the loop."
      },
      {
        "question": "Define a \"Node\" in an electric circuit.",
        "answer": "A node is a point in an electric circuit where *two or more branches* are joined together.",
        "category": "important",
        "badgeTitle": "KEY POINT",
        "badgeText": "It is the junction point used for applying Kirchhoff's Point Rule."
      },
      {
        "question": "What is a \"Datum Node\"?",
        "answer": "A node whose *potential is taken as zero* for reference in circuit analysis is called a datum node.",
        "category": "important",
        "badgeTitle": "SYNONYM",
        "badgeText": "It is often referred to as the reference node or ground node."
      },
      {
        "question": "How does a thermistor limit \"Inrush Current\"?",
        "answer": "Thermistors are used to *limit the initial flow of current* when a device is first turned on to protect its components.",
        "category": "important",
        "badgeTitle": "KEY POINT",
        "badgeText": "Their variable resistance properties allow for a controlled power-up sequence."
      },
      {
        "question": "Mention one application of LDRs in photography.",
        "answer": "LDRs are used for *camera exposure control* to adjust the exposure time based on the amount of available light.",
        "category": "important",
        "badgeTitle": "KEY POINT",
        "badgeText": "They sense the ambient light levels and provide a corresponding voltage change to the camera's circuitry."
      },
      {
        "question": "Why is copper preferred for making electric wires?",
        "answer": "Copper is one of the *best conductors* (along with silver) because of its *very low resistivity*.",
        "category": "important",
        "badgeTitle": "VALUE",
        "badgeText": "Its resistivity is $1.69\\times10^{-8} \\Omega m$."
      },
      {
        "question": "Define \"Specific Resistance\".",
        "answer": "Specific resistance (another name for *resistivity*) is the characteristic property of a material that quantifies its *opposition to current flow*.",
        "category": "important",
        "badgeTitle": "FORMULA",
        "badgeText": "$\\rho = \\frac{RA}{L}$"
      },
      {
        "question": "What happens to the terminal voltage of a cell when the switch is open?",
        "answer": "When the switch is open (no current flows), the *terminal voltage is equal to the EMF* ($E$) of the cell.",
        "category": "important",
        "badgeTitle": "KEY POINT",
        "badgeText": "The potential drop $Ir$ becomes zero because $I = 0$."
      },
      {
        "question": "State the principle of a \"Potential Divider\".",
        "answer": "A potential divider provides a *potential difference* that is dependent on the ratio of resistances in a circuit.",
        "category": "important",
        "badgeTitle": "APPLICATION",
        "badgeText": "Used in thermistors and LDRs to provide temperature or light-dependent output voltages."
      },
      {
        "question": "What is the effect of potential difference on the drift velocity of electrons?",
        "answer": "The drift velocity is *directly proportional* to the applied potential difference; increasing the voltage increases the velocity of the charge carriers.",
        "category": "important",
        "badgeTitle": "KEY POINT",
        "badgeText": "A stronger electric field exerts a greater force on the free electrons."
      },
      {
        "question": "What are the parameters in the expression $I = nAvq$ for a current-carrying conductor?",
        "answer": "In this expression, $n$ is the *number of charge carriers per unit volume*, $A$ is the cross-sectional area, $v$ is the drift velocity, and $q$ is the charge on each carrier.",
        "category": "important",
        "badgeTitle": "EQUATION",
        "badgeText": "$I=nAvq$"
      },
      {
        "question": "Differentiate between direct current (D.C) and alternating current (A.C).",
        "answer": "If the charges move around a circuit in the same direction at all times, it is called *direct current (D.C)*, whereas if they change direction in regular intervals, it is *alternating current (A.C)*.",
        "category": "important",
        "badgeTitle": "EXAMPLES",
        "badgeText": "Batteries produce D.C, while mostly electric generators produce A.C."
      },
      {
        "question": "How is an ideal voltmeter different from a practical one?",
        "answer": "An *ideal voltmeter* would have an infinite resistance so that it does not draw any current from the circuit.",
        "category": "important",
        "badgeTitle": "KEY POINT",
        "badgeText": "A practical voltmeter must have a large resistance compared to the circuit so it does not alter the circuit current and the potential difference being measured."
      },
      {
        "question": "Why is a potentiometer preferred over a standard voltmeter for measuring EMF?",
        "answer": "A potentiometer determines the unknown emf when *no current is drawn from it*, making it one of the most accurate methods for measuring potential.",
        "category": "important",
        "badgeTitle": "KEY POINT",
        "badgeText": "Standard voltmeters draw some current, which alters the actual potential difference being measured."
      },
      {
        "question": "Give the formula used to compare the EMFs of two cells using a potentiometer.",
        "answer": "The ratio of the emfs is equal to the ratio of their respective *balancing lengths* on the potentiometer wire.",
        "category": "important",
        "badgeTitle": "FORMULA",
        "badgeText": "$\\frac{E_{1}}{E_{2}}=\\frac{l_{1}}{l_{2}}$"
      },
      {
        "question": "What is the sign convention for traversing a source of EMF in Kirchhoff's rules?",
        "answer": "If a source of emf is traversed from the *positive to the negative terminal*, the potential change is positive, and it is negative in the opposite direction.",
        "category": "important",
        "badgeTitle": "KEY POINT",
        "badgeText": "This convention ensures the accurate calculation of the algebraic sum of voltage changes."
      },
      {
        "question": "What is the sign convention for traversing a resistor in a closed loop?",
        "answer": "If a resistor is traversed in the *direction of current*, the change in potential is positive.",
        "category": "important",
        "badgeTitle": "KEY POINT",
        "badgeText": "It is taken as negative in the opposite direction."
      },
      {
        "question": "How are thermistors constructed?",
        "answer": "Thermistors are made by *heating under high pressure* semiconductor ceramic made from mixtures of metallic oxides (like manganese, nickel, cobalt, copper, iron) and then baked at high temperature.",
        "category": "important",
        "badgeTitle": "SHAPES",
        "badgeText": "They may be in the form of beads, rods, or washers."
      },
      {
        "question": "Name three practical applications of thermistors.",
        "answer": "Thermistors are used for *temperature measurement* (in air conditioners, incubators), *temperature compensation* (in oscillators), and *inrush current limiting*.",
        "category": "important",
        "badgeTitle": "KEY APPLICATION",
        "badgeText": "They are also widely used as voltage dividers in fire alarms."
      },
      {
        "question": "What material is typically used to make a Light Dependent Resistor (LDR)?",
        "answer": "LDRs are typically made from semiconductor material like *cadmium sulphide*.",
        "category": "important",
        "badgeTitle": "STRUCTURE",
        "badgeText": "The material is deposited in a special pattern on an insulating plate."
      },
      {
        "question": "Mention two real-life applications of Light Dependent Resistors (LDRs).",
        "answer": "LDRs are commonly used in *light sensing circuits* (such as automatic street lights) and for *camera exposure control*.",
        "category": "important",
        "badgeTitle": "WORKING",
        "badgeText": "They act like a switch that turns ON at dusk and OFF at dawn."
      },
      {
        "question": "How do inspectors check the reliability of a concrete bridge using carbon fibers?",
        "answer": "Inspectors check reliability by applying a small electric current to *carbon fibers embedded in the concrete* and measuring the electrical resistance of the network.",
        "category": "important",
        "badgeTitle": "INDICATOR",
        "badgeText": "If the resistance increases over time, it indicates that the concrete is deteriorating or the fibers are cracking."
      },
      {
        "question": "What happens to the resistance of an LDR in total darkness?",
        "answer": "In darkness, the semiconductor material has very few free electrons (charge carriers), resulting in a *very high resistance*.",
        "category": "important",
        "badgeTitle": "CONTRAST",
        "badgeText": "When light photons hit it, they free electrons, making the material conduct electricity and its resistance decreases."
      },
      {
        "question": "How does a thermistor act as a trigger in a fire alarm circuit?",
        "answer": "As the thermistor is heated by fire, its resistance decreases, causing a drop in its voltage; this increases the potential at the connecting point, which triggers the alarm (e.g., turning a NOT gate high).",
        "category": "important",
        "badgeTitle": "COMPONENT ROLE",
        "badgeText": "It acts as a temperature-sensitive voltage divider."
      },
      {
        "question": "Derive the equation $P = I^2R$ for power dissipation.",
        "answer": "By substituting Ohm's law ($V=IR$) into the general electrical power equation ($P = V \\times I$), we get the power dissipated in a resistor.",
        "category": "important",
        "badgeTitle": "DERIVATION",
        "badgeText": "$P = V \\times I = (IR) \\times I = I^2R$"
      },
      {
        "question": "What is the reading of a voltmeter connected across a cell in an open circuit?",
        "answer": "When the switch is open and no current passes through the circuit, the voltmeter reads the *EMF ($E$)* of the cell as the terminal voltage.",
        "category": "important",
        "badgeTitle": "REASONING",
        "badgeText": "The internal voltage drop $Ir$ is zero because $I = 0$."
      },
      {
        "question": "What condition must be met for a Wheatstone bridge to be balanced?",
        "answer": "The bridge is balanced when *no current flows through the galvanometer*, which happens when the potential difference across it is zero.",
        "category": "important",
        "badgeTitle": "FORMULA",
        "badgeText": "$\\frac{R_{1}}{R_{2}}=\\frac{R_{3}}{R_{4}}$"
      },
      {
        "question": "What forms the electric current inside a solid metallic conductor?",
        "answer": "Inside a solid conductor, the electric current is formed by the *slow drift velocity* of the free electrons moving under the influence of an applied electric field.",
        "category": "important",
        "badgeTitle": "VALUE",
        "badgeText": "This drift velocity is on the order of $10^{-3} m s^{-1}$."
      },
      {
        "question": "What is the relative permittivity of distilled water and germanium?",
        "answer": "The relative permittivity ($\\epsilon_{r}$) of distilled water is 78.5, whereas for germanium it is 16.",
        "category": "conceptual",
        "badgeTitle": "KEY POINT",
        "badgeText": "The value of relative permittivity is a constant for a given dielectric and depends entirely on the nature of the medium."
      },
      {
        "question": "Why do the hairs lift when a Van de Graaff generator is touched?",
        "answer": "When touched, the net positive charge spreads from the dome to the person's body.",
        "category": "conceptual",
        "badgeTitle": "REASONING",
        "badgeText": "This causes like charges to accumulate on individual hairs, and the repulsive forces between these like charges force the hair strands to stand up and separate."
      },
      {
        "question": "Does an electrostatic force exist between a charged and an uncharged object?",
        "answer": "Yes, an electrostatic force can exist due to *electrostatic induction*.",
        "category": "conceptual",
        "badgeTitle": "RESULT",
        "badgeText": "The charged object induces an opposite charge on the near surface of the uncharged object, leading to a net attractive force between them."
      },
      {
        "question": "What information does an electrocardiogram (ECG) provide when taken in a running position?",
        "answer": "An ECG records the voltage between points on human skin generated by the electrical processes in the heart.",
        "category": "conceptual",
        "badgeTitle": "KEY APPLICATION",
        "badgeText": "Taking it in a running position provides vital information about the heart's performance under stress."
      },
      {
        "question": "How is electroencephalography (EEG) used in medical diagnostics?",
        "answer": "In electroencephalography, the potential differences created by the electrical activity of the brain are recorded.",
        "category": "conceptual",
        "badgeTitle": "KEY POINT",
        "badgeText": "These measured potential differences are utilized for diagnosing abnormal behavior or brain conditions."
      },
      {
        "question": "Why is it advised to wear rubber-soled shoes while handling electric appliances?",
        "answer": "Rubber is an excellent *insulator* (with a dielectric constant of 3.40), which prevents the flow of electric current from the appliance through the body to the ground.",
        "category": "conceptual",
        "badgeTitle": "SAFETY ASPECT",
        "badgeText": "It protects the person from getting a severe electric shock."
      },
      {
        "question": "Compare the flow of current, heat, and fluid with their respective driving factors.",
        "answer": "The flow of current is directly proportional to the potential difference. The flow of heat is directly proportional to the temperature difference. The flow of fluid is directly proportional to the pressure difference.",
        "category": "conceptual",
        "badgeTitle": "CONCEPT",
        "badgeText": "Each physical flow is driven by a specific type of gradient."
      },
      {
        "question": "An uncharged conducting hollow sphere is placed in the field of a positive charge q. What will be the net flux through the shell?",
        "answer": "The net flux through the shell will be *zero*.",
        "category": "conceptual",
        "badgeTitle": "REASONING",
        "badgeText": "According to Gauss's law ($\\phi_{e} = Q/\\epsilon_{0}$), since the net charge enclosed by the uncharged hollow sphere is zero, the total flux passing through it must also be zero."
      },
      {
        "question": "Is electron-volt a unit of potential difference or energy? Explain.",
        "answer": "Electron-volt (eV) is a unit of *energy*, not potential difference.",
        "category": "conceptual",
        "badgeTitle": "EXPLANATION",
        "badgeText": "It is defined as the amount of energy acquired or lost by an electron as it traverses a potential difference of one volt ($1eV = 1.6 \\times 10^{-19} J$)."
      },
      {
        "question": "How does a moving conductor like an aeroplane acquire charge as it flies through the air?",
        "answer": "As an aeroplane flies, it constantly rubs against air molecules and dust particles, acquiring a static charge due to *friction*.",
        "category": "conceptual",
        "badgeTitle": "KEY POINT",
        "badgeText": "Electrons are either stripped from or added to the aeroplane's metal surface during this continuous frictional contact."
      },
      {
        "question": "A copper wire of length L has resistance R. It is stretched to double of its length. What will be the resistance of the new length of wire?",
        "answer": "The resistance of the newly stretched wire will become *four times* its original resistance ($4R$).",
        "category": "conceptual",
        "badgeTitle": "FORMULA",
        "badgeText": "Since volume remains constant, stretching to $2L$ halves the area ($A/2$). Thus, $R_{new} = \\rho\\frac{2L}{A/2} = 4\\rho\\frac{L}{A} = 4R$."
      },
      {
        "question": "Is the filament resistance lower or higher in a 500W-220V light bulb than in a 100W-220V bulb?",
        "answer": "The filament resistance is *lower* in the 500W-220V light bulb.",
        "category": "conceptual",
        "badgeTitle": "FORMULA",
        "badgeText": "Using the power formula $P = V^{2}/R$, resistance is inversely proportional to power ($R = V^{2}/P$). Therefore, a higher power rating at the same voltage implies a lower resistance."
      },
      {
        "question": "Why does the terminal potential difference of a battery decrease when the current drawn from it is increased?",
        "answer": "The terminal voltage ($V$) is given by $V = E - Ir$. When the drawn current ($I$) increases, the potential drop across the internal resistance ($Ir$) also increases.",
        "category": "conceptual",
        "badgeTitle": "RESULT",
        "badgeText": "This causes the terminal potential difference available to the external circuit to decrease correspondingly."
      },
      {
        "question": "What is the effect on the drift velocity of free electrons by decreasing the length and the temperature of a copper wire?",
        "answer": "Decreasing the length increases the electric field ($E=V/d$), and decreasing the temperature reduces atomic collisions (decreasing resistance).",
        "category": "conceptual",
        "badgeTitle": "KEY POINT",
        "badgeText": "Both factors cause the drift velocity to increase, as the electrons experience a stronger internal field and fewer obstructions."
      },
      {
        "question": "Why is a three-pin plug used in some electric appliances?",
        "answer": "The third pin in a three-pin plug is for the *earth* (or ground) connection, which safely diverts fault currents to the ground.",
        "category": "conceptual",
        "badgeTitle": "SAFETY ASPECT",
        "badgeText": "It protects the user from fatal electric shocks if the live wire accidentally comes into contact with the appliance's metal casing."
      },
      {
        "question": "What distinguishes a \"node\" from a \"datum node\" in circuit analysis?",
        "answer": "A node is any point joining two or more branches in an electric circuit. A *datum node* is a specific reference node whose potential is arbitrarily taken as zero.",
        "category": "conceptual",
        "badgeTitle": "APPLICATION",
        "badgeText": "The datum node simplifies the calculation of potential at all other nodes in complex network analysis."
      },
      {
        "question": "Aside from electrostatics, in which other specific fields did Charles de Coulomb make major contributions?",
        "answer": "He made significant contributions to the fields of *structural mechanics* (forces on beams) and *ergonomics*.",
        "category": "conceptual",
        "badgeTitle": "KEY POINT",
        "badgeText": "His research provided a fundamental understanding of how people and animals can best do work."
      }
    ],
    "10": [],
    "11": [],
    "12": []
  },
  "Islamiyat": {
    "Baab 1": {
      "Topic 1": [],
      "Topic 2": []
    },
    "Baab 2 - Sub-topic 1": {
      "Ch 1": [],
      "Ch 2": [],
      "Ch 3": [],
      "Ch 4": [],
      "Ch 5": []
    },
    "Baab 2 - Sub-topic 2": {
      "Ch 1": [],
      "Ch 2": [],
      "Ch 3": [],
      "Ch 4": []
    },
    "Baab 3": {
      "Topic 1": [],
      "Topic 2": [],
      "Topic 3": [],
      "Topic 4": []
    },
    "Baab 4": {
      "Topic 1": [],
      "Topic 2": []
    },
    "Baab 5": {
      "Topic 1": [],
      "Topic 2": []
    },
    "Baab 6": {
      "Topic 1": [],
      "Topic 2": []
    },
    "Baab 7": {
      "Topic 1": [],
      "Topic 2": []
    }
  },
  "Tarjama-tul-Quran": {
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": []
  }
};

window.siteData = siteData;
