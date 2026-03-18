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
        "question": "What is the magnitude of the smallest amount of free charge discovered?",
        "answer": "The minimum amount of charge that any particle may contain is the charge on an electron or proton, which is *$1.6\\times 10^{-19}$ C*.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$q=Ne$"
      },
      {
        "question": "What does the study of electrostatics entail?",
        "answer": "Electrostatics is the study of phenomena and properties of *electric charges at rest*.",
        "category": "most",
        "badgeTitle": "KEY DISTINCTION",
        "badgeText": "When charges are in motion, it is called an electric current."
      },
      {
        "question": "How does Coulomb's law quantify the force between two charged objects?",
        "answer": "The force is *directly proportional* to the product of the magnitudes of charges and *inversely proportional* to the square of the distance between them.",
        "category": "most",
        "badgeTitle": "MATHEMATICAL FORM",
        "badgeText": "$F=k\\frac{q_{1}q_{2}}{r^{2}}$"
      },
      {
        "question": "What factors determine the value of the constant of proportionality $k$ in Coulomb's Law?",
        "answer": "Its value depends upon the *nature of medium* between the two charges and the *system of units* in which $F$, $q$, and $r$ are measured.",
        "category": "most",
        "badgeTitle": "CONSTANT FORMULA",
        "badgeText": "$k=\\frac{1}{4\\pi\\epsilon_{0}}$"
      },
      {
        "question": "What is the permittivity of free space?",
        "answer": "It is an electrical constant represented by $\\epsilon_{0}$, with a value of *$8.85\\times 10^{-12}$ C$^{2}$ N$^{-1}$ m$^{-2}$* in SI units.",
        "category": "most",
        "badgeTitle": "RESULTING $k$ VALUE",
        "badgeText": "$9\\times 10^{9}$ N m$^{2}$ C$^{-2}$"
      },
      {
        "question": "Why is Coulomb's force considered a mutual force?",
        "answer": "If charge $q_{1}$ exerts a force on $q_{2}$, then $q_{2}$ also exerts an *equal and opposite* force on $q_{1}$.",
        "category": "most",
        "badgeTitle": "VECTOR RELATION",
        "badgeText": "$F_{12}=-F_{21}$"
      },
      {
        "question": "How does the presence of a dielectric medium affect the electrostatic force?",
        "answer": "The presence of a dielectric always *reduces the electrostatic force* as compared to free space by a constant factor known as relative permittivity.",
        "category": "most",
        "badgeTitle": "DIELECTRIC FORMULA",
        "badgeText": "$F_{12}=\\frac{1}{4\\pi\\epsilon_{0}\\epsilon_{r}}\\frac{q_{1}q_{2}}{r^{2}}$"
      },
      {
        "question": "How is electric intensity or electric field strength defined at a point?",
        "answer": "It is defined as the force experienced by a *unit positive charge* placed at that point.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$E=\\frac{F}{q}$"
      },
      {
        "question": "What is the SI unit of electric field intensity?",
        "answer": "The unit of electric intensity is *newton per coulomb* (N C$^{-1}$).",
        "category": "most",
        "badgeTitle": "VECTOR PROPERTY",
        "badgeText": "The direction of $E$ is the same as that of the force $F$."
      },
      {
        "question": "How is electric flux quantitatively defined?",
        "answer": "Electric flux is the number of *field lines* passing through a certain *element of area*.",
        "category": "most",
        "badgeTitle": "SCALAR PRODUCT",
        "badgeText": "$\\phi_{e}=E \\cdot A$"
      },
      {
        "question": "Under what condition is the electric flux through an area maximum?",
        "answer": "The flux is maximum when the area $A$ is held *perpendicular* to the field lines, making the angle between the normal and the field 0°.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$\\phi_{e}=EA$"
      },
      {
        "question": "What happens to electric flux when the area is held parallel to the electric field lines?",
        "answer": "No lines cross the area, resulting in a *minimum* flux of zero.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$\\phi_{e}=0$"
      },
      {
        "question": "Does the total electric flux through a closed surface depend on the geometry of the surface?",
        "answer": "No, the total flux through a closed surface does not depend upon the *shape or geometry*; it only depends upon the medium and the *charge enclosed*.",
        "category": "most",
        "badgeTitle": "GAUSS'S FLUX FORMULA",
        "badgeText": "$\\phi_{e}=\\frac{q}{\\epsilon_{0}}$"
      },
      {
        "question": "What is the mathematical statement of Gauss's Law?",
        "answer": "The total electric flux through any closed surface is *$1/\\epsilon_{0}$ times the total charge* enclosed in it.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$\\phi_{e}=\\frac{1}{\\epsilon_{0}}\\times Q$"
      },
      {
        "question": "What defines the electric potential difference between two points in an electric field?",
        "answer": "It is the work done in carrying a *unit positive charge* from one point to another while keeping the charge in *equilibrium*.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$\\Delta V=\\frac{W_{AB}}{q}$"
      },
      {
        "question": "How is the SI unit of potential difference, the volt, defined?",
        "answer": "A potential difference of *1 volt* exists if the work done in moving a 1 coulomb positive charge between two points is *one joule*.",
        "category": "most",
        "badgeTitle": "UNIT EQUIVALENCE",
        "badgeText": "$1\\text{ volt}=\\frac{1\\text{ joule}}{1\\text{ coulomb}}$"
      },
      {
        "question": "What serves as the reference point for defining absolute electric potential at a specific location?",
        "answer": "The reference point is usually taken at *infinity*, where the electric potential is assigned a value of *zero*.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$V=\\frac{W}{q}$"
      },
      {
        "question": "What is the relationship between electric intensity and potential gradient?",
        "answer": "The electric intensity is equal to the *negative of the gradient of potential*.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$E=-\\frac{\\Delta V}{\\Delta d}$"
      },
      {
        "question": "Why is there a negative sign in the potential gradient formula?",
        "answer": "The negative sign indicates that the direction of the electric field $E$ is along the *decreasing potential*.",
        "category": "most",
        "badgeTitle": "SI UNIT MATCH",
        "badgeText": "$1\\text{ V m}^{-1} = 1\\text{ N C}^{-1}$"
      },
      {
        "question": "How is one electron-volt (eV) defined?",
        "answer": "It is the amount of energy acquired or lost by an *electron* as it traverses a potential difference of *one volt*.",
        "category": "most",
        "badgeTitle": "ENERGY VALUE",
        "badgeText": "$1\\text{ eV}=1.6\\times 10^{-19}\\text{ J}$"
      },
      {
        "question": "Why is an electric current set up almost instantaneously when a switch is turned on?",
        "answer": "All free electrons start drifting simultaneously, repelling neighboring electrons so the *disturbance propagates* along the wire almost instantaneously.",
        "category": "most",
        "badgeTitle": "DRIFT VELOCITY ORDER",
        "badgeText": "$10^{-3}$ m s$^{-1}$"
      },
      {
        "question": "What is the definition of direct current (D.C)?",
        "answer": "A current where charges move around a circuit in the *same direction at all times*.",
        "category": "most",
        "badgeTitle": "EXAMPLE",
        "badgeText": "Batteries produce direct current."
      },
      {
        "question": "What is conventional current?",
        "answer": "The hypothetical flow of *positive charges* from a point of higher potential to a point of lower potential that has the same effect as actual electron flow.",
        "category": "most",
        "badgeTitle": "DIRECTION CHECK",
        "badgeText": "Flows from the positive terminal towards the negative terminal."
      },
      {
        "question": "How is current expressed in terms of drift velocity and charge carrier density?",
        "answer": "The current is proportional to the number of charge carriers per unit volume, cross-sectional area, drift velocity, and charge of the carrier.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$I=nAvq$"
      },
      {
        "question": "What is the fundamental statement of Ohm's Law?",
        "answer": "The current flowing through a conductor is *directly proportional* to the potential difference applied, provided there is *no change in the physical state* of the conductor.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$V=IR$"
      },
      {
        "question": "How is the resistivity (specific resistance) of a material defined mathematically?",
        "answer": "Resistivity is defined as the resistance of a *metre cube* of a material.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$\\rho=\\frac{RA}{L}$"
      },
      {
        "question": "What is the physical cause of resistance increasing with temperature in metallic conductors?",
        "answer": "The amplitude of vibration of atoms increases, providing a bigger collision target, making collisions between *free electrons and lattice atoms* more frequent.",
        "category": "most",
        "badgeTitle": "PROPERTY",
        "badgeText": "Temperature coefficient of resistance ($\\alpha$)"
      },
      {
        "question": "How is electrical power mathematically related to voltage and current?",
        "answer": "Electrical power is the rate at which a battery supplies energy, calculated as the product of *voltage and current*.",
        "category": "most",
        "badgeTitle": "FORMULAS",
        "badgeText": "$P=VI=I^{2}R=V^{2}/R$"
      },
      {
        "question": "How is the electromotive force (EMF) of a source defined?",
        "answer": "The EMF is the *energy supplied* to a unit charge by the cell as it passes from the negative to the positive terminal.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$E=\\frac{W}{Q}$"
      },
      {
        "question": "Why is the terminal voltage of a cell less than its EMF when current is flowing?",
        "answer": "A part of the energy is dissipated into the cell itself due to its *internal resistance* $r$, causing a potential drop.",
        "category": "most",
        "badgeTitle": "EQUATION",
        "badgeText": "$V=E-Ir$"
      },
      {
        "question": "What is the underlying physical principle behind Kirchhoff's First Rule (point rule)?",
        "answer": "It is a manifestation of the *law of conservation of charge*; the total charge flowing towards a node equals the total charge flowing away from it.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$\\Sigma I=0$"
      },
      {
        "question": "What conservation law is the basis of Kirchhoff's Second Rule (loop rule)?",
        "answer": "It is a particular way of stating the *law of conservation of energy* in electrical problems, stating the algebraic sum of voltage changes is zero.",
        "category": "most",
        "badgeTitle": "EQUATION FORM",
        "badgeText": "$E_{1}-IR_{1}-E_{2}-IR_{2}=0$"
      },
      {
        "question": "What is the required condition for a Wheatstone Bridge to be balanced?",
        "answer": "No current must flow through the *galvanometer*, meaning it shows zero deflection.",
        "category": "most",
        "badgeTitle": "RESISTANCE RATIO",
        "badgeText": "$\\frac{R_{1}}{R_{2}}=\\frac{R_{3}}{R_{4}}$"
      },
      {
        "question": "Why is a potentiometer considered an accurate potential measuring instrument?",
        "answer": "It measures the unknown EMF when *no current is drawn* from it (null condition), thus bypassing internal resistance drop errors.",
        "category": "most",
        "badgeTitle": "COMPARISON FORMULA",
        "badgeText": "$\\frac{E_{1}}{E_{2}}=\\frac{l_{1}}{l_{2}}$"
      },
      {
        "question": "How does the Coulomb force change if the distance between two point charges is doubled?",
        "answer": "The force decreases to *one quarter* of its original value.",
        "category": "most",
        "badgeTitle": "RELATION",
        "badgeText": "Inverse square law ($F \\propto 1/r^2$)"
      },
      {
        "question": "What is the significance of unit vectors in Coulomb's Law?",
        "answer": "Unit vectors are introduced to represent the *direction* of the mutual electrostatic forces between the charges.",
        "category": "most",
        "badgeTitle": "UNIT VECTOR FORMULA",
        "badgeText": "$\\hat{r}_{12}$ and $\\hat{r}_{21}$"
      },
      {
        "question": "Is electric field intensity a scalar or a vector quantity?",
        "answer": "It is a *vector quantity* because it is defined as the force experienced by a unit positive charge.",
        "category": "most",
        "badgeTitle": "DIRECTION",
        "badgeText": "Same as that of the electrostatic force $F$"
      },
      {
        "question": "What happens to the electric field intensity at the exact midpoint between two identical positive point charges?",
        "answer": "The electric field is *zero* because the fields contributed by them have equal magnitude but opposite directions, canceling each other out.",
        "category": "most",
        "badgeTitle": "CONCEPT",
        "badgeText": "Zero field spot / Neutral zone"
      },
      {
        "question": "What is the SI unit of electric flux?",
        "answer": "The SI unit of electric flux is *newton metre squared per coulomb* (N m$^{2}$ C$^{-1}$).",
        "category": "most",
        "badgeTitle": "NATURE",
        "badgeText": "Scalar quantity"
      },
      {
        "question": "How is the vector area defined in the context of calculating electric flux?",
        "answer": "It is a vector whose magnitude is equal to the *surface area* of the element and whose direction is along the *normal* drawn outward to the area.",
        "category": "most",
        "badgeTitle": "SYMBOL",
        "badgeText": "$\\Delta A$ or $A$"
      },
      {
        "question": "Does the total electric flux through a closed surface depend upon the radius of the spherical surface enclosing the charge?",
        "answer": "No, the total flux is *independent of the radius* or shape; it depends only on the enclosed charge and the medium.",
        "category": "most",
        "badgeTitle": "GAUSS'S FLUX FORMULA",
        "badgeText": "$\\phi_{e}=\\frac{q}{\\epsilon_{0}}$"
      },
      {
        "question": "According to Gauss's Law, what is the electric flux through a closed surface enclosing arbitrarily distributed charges $q_1, q_2, \\dots, q_n$?",
        "answer": "It is $1/\\epsilon_{0}$ times the *total charge enclosed*, $Q = q_1 + q_2 + \\dots + q_n$.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$\\phi_{e}=\\frac{1}{\\epsilon_{0}} \\times Q$"
      },
      {
        "question": "How is the change in potential energy ($\\Delta U$) of a charge related to the potential difference ($\\Delta V$)?",
        "answer": "The change in potential energy is the product of the *charge* $q$ and the *potential difference* $\\Delta V$.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$\\Delta U = q\\Delta V$"
      },
      {
        "question": "What is the physical meaning of potential gradient?",
        "answer": "The potential gradient gives the *maximum value* of the rate of change of potential with distance.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$\\frac{\\Delta V}{\\Delta d}$"
      },
      {
        "question": "What happens to the potential energy of a positive charge when it is moved against the direction of an electric field?",
        "answer": "The external work done on the charge to move it against the field increases its *electrical potential energy*.",
        "category": "most",
        "badgeTitle": "ENERGY CONVERSION",
        "badgeText": "Work done ($W_{AB}$) = Gain in P.E. ($\\Delta U$)"
      },
      {
        "question": "How many joules are equivalent to one electron-volt?",
        "answer": "One electron-volt is exactly equal to *$1.6\\times 10^{-19}$ joules*.",
        "category": "most",
        "badgeTitle": "EQUIVALENCE",
        "badgeText": "$1\\text{ eV}=1.6\\times 10^{-19}\\text{ J}$"
      },
      {
        "question": "What is the SI unit of electric current and how is it defined?",
        "answer": "The SI unit is the *ampere (A)*, which is the current due to the flow of *one coulomb* of charge per *second*.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$1\\text{ A} = \\frac{1\\text{ C}}{1\\text{ s}}$"
      },
      {
        "question": "What defines an alternating current (A.C)?",
        "answer": "A current where the charges move first one way and then the opposite way, *changing direction* in regular intervals.",
        "category": "most",
        "badgeTitle": "SOURCE EXAMPLE",
        "badgeText": "Power station electric generators"
      },
      {
        "question": "How does free electron motion in a conductor change after an electric field is applied?",
        "answer": "Instead of just random collisions, the electrons acquire an overall *average velocity* called the drift velocity in the direction opposite to the electric field ($-E$).",
        "category": "most",
        "badgeTitle": "DRIFT VELOCITY ORDER",
        "badgeText": "$10^{-3}\\text{ m s}^{-1}$"
      },
      {
        "question": "What is the standard definition of one ohm?",
        "answer": "The resistance of a conductor is 1 ohm if a current of *1 ampere* flows through it when a potential difference of *1 volt* is applied across its ends.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$1\\text{ }\\Omega = \\frac{1\\text{ V}}{1\\text{ A}}$"
      },
      {
        "question": "What is the primary difference between resistance and resistivity?",
        "answer": "Resistance is a characteristic of a *particular wire* (depending on length and area), whereas resistivity is the inherent property of the *material* of which the wire is made.",
        "category": "most",
        "badgeTitle": "UNIT OF RESISTIVITY",
        "badgeText": "ohm-metre ($\\Omega$ m)"
      },
      {
        "question": "How is electrical conductivity mathematically related to resistivity?",
        "answer": "Conductivity, denoted by $\\sigma$, is the exact *reciprocal* of resistivity $\\rho$.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$\\sigma=\\frac{1}{\\rho}$"
      },
      {
        "question": "What are the SI units of electrical conductivity?",
        "answer": "The SI unit of conductivity is *ohm$^{-1}$ m$^{-1}$* or *mho m$^{-1}$*.",
        "category": "most",
        "badgeTitle": "SYMBOL",
        "badgeText": "$\\sigma$"
      },
      {
        "question": "What does the temperature coefficient of resistance ($\\alpha$) measure?",
        "answer": "It measures the *fractional change in resistance* per kelvin over a considerable range of temperature.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$\\alpha=\\frac{R_{t}-R_{o}}{R_{o}t}$"
      },
      {
        "question": "Which specific materials exhibit a negative temperature coefficient of resistance?",
        "answer": "Substances like *germanium and silicon* have a resistance that decreases with an increase in temperature.",
        "category": "most",
        "badgeTitle": "MATERIAL CATEGORY",
        "badgeText": "Semiconductors"
      },
      {
        "question": "How is electrical power defined in terms of energy and time?",
        "answer": "Electrical power is the rate at which the battery supplies *electrical energy*, or the energy supplied per unit *time*.",
        "category": "most",
        "badgeTitle": "FORMULA",
        "badgeText": "$P = \\frac{\\text{Energy supplied}}{t}$"
      },
      {
        "question": "What are the three standard equations for calculating the power dissipated in a resistor?",
        "answer": "Power can be calculated as voltage times current, current squared times resistance, or voltage squared divided by resistance.",
        "category": "most",
        "badgeTitle": "FORMULAS",
        "badgeText": "$P=VI$, $P=I^{2}R$, $P=V^{2}/R$"
      },
      {
        "question": "What is the fundamental origin of the energy supplied by a cell to its charge carriers?",
        "answer": "The energy is derived from the conversion of *chemical energy* into *electrical energy* inside the cell.",
        "category": "most",
        "badgeTitle": "SOURCE CHARACTERISTIC",
        "badgeText": "Electromotive Force (EMF)"
      },
      {
        "question": "What does a voltmeter measure when connected across the terminals of a cell in an open circuit (switch OFF)?",
        "answer": "It directly measures the *electromotive force (EMF)* of the cell because no current passes through the internal resistance to cause a voltage drop.",
        "category": "most",
        "badgeTitle": "CONDITION",
        "badgeText": "$I = 0$, so $V = E$"
      },
      {
        "question": "When applying Kirchhoff's Second Rule, what does a negative potential change across a resistor indicate?",
        "answer": "It indicates that the resistor is being traversed in the *direction of the current*, moving from high to low potential.",
        "category": "most",
        "badgeTitle": "POTENTIAL DROP",
        "badgeText": "$V=-IR$"
      },
      {
        "question": "When applying Kirchhoff's Second Rule, what does a positive potential change across a battery indicate?",
        "answer": "It indicates that the source of EMF is being traversed from the *negative to the positive terminal*.",
        "category": "most",
        "badgeTitle": "POTENTIAL CHANGE",
        "badgeText": "$E=+E$"
      },
      {
        "question": "Why is it absolutely necessary for an ideal voltmeter to have an infinite resistance?",
        "answer": "So that it does not draw any *appreciable current* from the circuit, which would alter the main circuit current and the exact potential difference to be measured.",
        "category": "most",
        "badgeTitle": "PRACTICAL ALTERNATIVES",
        "badgeText": "Digital voltmeters or cathode-ray oscilloscopes"
      },
      {
        "question": "What is the primary operational principle behind a potentiometer?",
        "answer": "It operates as a *potential divider*, where a sliding contact varies the resistance and potential drop linearly across a wire of uniform cross-section.",
        "category": "most",
        "badgeTitle": "VOLTAGE DIVIDER FORMULA",
        "badgeText": "$rI = rE/R$"
      },
      {
        "question": "What strict condition must be met for a potentiometer to successfully find an unknown EMF?",
        "answer": "The unknown EMF $E_{x}$ should *not exceed* the maximum potential $E$ of the driving battery, otherwise the null deflection condition cannot be obtained.",
        "category": "most",
        "badgeTitle": "CONSTRAINT",
        "badgeText": "$E_{x} \\le E$"
      },
      {
        "question": "How does a Light Dependent Resistor (LDR) behave when placed in total darkness?",
        "answer": "In darkness, the semiconductor material has very few *free electrons*, resulting in a very *high resistance*.",
        "category": "most",
        "badgeTitle": "MATERIAL EXAMPLE",
        "badgeText": "Cadmium sulphide"
      },
      {
        "question": "What causes the resistance of a thermistor to decrease when its temperature increases?",
        "answer": "Increasing the temperature provides more energy to the *charge carriers* (electrons or holes), enabling them to move more freely.",
        "category": "most",
        "badgeTitle": "CHARACTERISTIC",
        "badgeText": "Negative temperature coefficient"
      },
      {
        "question": "How is a typical thermistor physically constructed?",
        "answer": "They are made by heating and pressing *semiconductor ceramic* mixtures of metallic oxides (manganese, nickel, cobalt, copper, iron) under high pressure.",
        "category": "most",
        "badgeTitle": "SHAPES",
        "badgeText": "Beads, rods, washers"
      },
      {
        "question": "How is a thermistor utilized as a voltage divider in a fire alarm circuit?",
        "answer": "As temperature rises, its resistance drops, decreasing its voltage drop; this increases the potential at a midpoint to turn a *NOT gate* high, which activates the siren.",
        "category": "most",
        "badgeTitle": "CIRCUIT APPLICATION",
        "badgeText": "Heat-triggered alarm switch"
      },
      {
        "question": "What is the specific value of the relative permittivity ($\\epsilon_r$) for air at standard atmosphere?",
        "answer": "The relative permittivity for air is *1.0006*, which is so close to one that it is often treated as free space.",
        "category": "important",
        "badgeTitle": "TABLE 9.1 REFERENCE",
        "badgeText": "Dielectric Constants"
      },
      {
        "question": "How do the unit vectors $\\hat{r}_{12}$ and $\\hat{r}_{21}$ relate to each other in the vector form of Coulomb's Law?",
        "answer": "They represent opposite directions along the line joining the charges, mathematically expressed as *$\\hat{r}_{21} = -\\hat{r}_{12}$*.",
        "category": "important",
        "badgeTitle": "VECTOR PROPERTY",
        "badgeText": "Determines attractive or repulsive nature"
      },
      {
        "question": "What alternative scientific term is frequently used to describe an insulating medium placed between two charges?",
        "answer": "An insulator used in this context is usually referred to as a *dielectric*.",
        "category": "important",
        "badgeTitle": "EFFECT ON FORCE",
        "badgeText": "Always reduces the electrostatic force"
      },
      {
        "question": "When calculating electric flux for an inclined area, what does the mathematical component $A \\cos\\theta$ physically represent?",
        "answer": "It represents the *projection of the area* which is exactly *perpendicular* to the electric field lines.",
        "category": "important",
        "badgeTitle": "ANGLE DEFINITION",
        "badgeText": "$\\theta$ is the angle between the field and the normal to the area"
      },
      {
        "question": "Why must a spherical Gaussian surface be divided into $n$ infinitesimally small patches ($\\Delta A$) when proving Gauss's flux formula?",
        "answer": "Because the basic flux formula $\\phi_e = E \\cdot A$ requires the surface area element to be *flat* to be accurately computed as a vector.",
        "category": "important",
        "badgeTitle": "ASSUMPTION",
        "badgeText": "$E$ is uniform over each small patch"
      },
      {
        "question": "What dynamic condition must be strictly maintained when moving a charge to define electric potential difference?",
        "answer": "The charge must be moved while keeping *electrostatic equilibrium*, meaning an external force must exactly balance the electric force so it moves with *uniform velocity*.",
        "category": "important",
        "badgeTitle": "ENERGY CONVERSION",
        "badgeText": "Work done increases electrical potential energy"
      },
      {
        "question": "How are electric potential energy difference ($\\Delta U$) and electric potential difference ($\\Delta V$) mathematically related?",
        "answer": "The potential energy difference is the product of the *test charge* $q$ and the *potential difference* $\\Delta V$.",
        "category": "important",
        "badgeTitle": "FORMULA",
        "badgeText": "$\\Delta U = q\\Delta V$"
      },
      {
        "question": "According to the provided medical side-note, what does an Electrocardiogram (ECG) practically measure?",
        "answer": "It records the *\"voltage\"* between points on human skin generated by the *electrical process in the heart*.",
        "category": "important",
        "badgeTitle": "DIAGNOSTIC USE",
        "badgeText": "Evaluates heart performance under stress"
      },
      {
        "question": "What biological phenomenon creates the potential difference measured in electroencephalography (EEG)?",
        "answer": "The *electrical activity of the brain* creates these potential differences, which are used for diagnosing abnormal behavior.",
        "category": "important",
        "badgeTitle": "APPLICATION",
        "badgeText": "Normal vs. Abnormal alpha rhythms"
      },
      {
        "question": "Why is an electric current established almost instantaneously across a circuit despite the actual drift velocity of electrons being very slow?",
        "answer": "Upon switching ON, the applied electric field causes all free electrons to *start drifting simultaneously*, and this electrical *disturbance propagates* along the wire almost at the speed of light.",
        "category": "important",
        "badgeTitle": "DRIFT SPEED",
        "badgeText": "Order of $10^{-3}$ m s$^{-1}$"
      },
      {
        "question": "Historically, what incorrect assumption led to the establishment of \"conventional current\"?",
        "answer": "Early scientists incorrectly believed that electric current was strictly due to the *flow of positive charges* rather than negative electrons.",
        "category": "important",
        "badgeTitle": "CONVENTION",
        "badgeText": "Flows from higher (+ve) to lower (-ve) potential"
      },
      {
        "question": "What is the physical definition of electrical conductance?",
        "answer": "Conductance is defined as the exact *reciprocal of resistance*, describing how easily current flows through a material.",
        "category": "important",
        "badgeTitle": "FORMULA",
        "badgeText": "$G = 1/R$"
      },
      {
        "question": "How is electrical conductivity ($\\sigma$) mathematically related to resistivity ($\\rho$)?",
        "answer": "Conductivity is the *reciprocal of resistivity*.",
        "category": "important",
        "badgeTitle": "FORMULA",
        "badgeText": "$\\sigma = \\frac{1}{\\rho}$"
      },
      {
        "question": "What are the accepted SI units for electrical conductivity?",
        "answer": "The SI unit is *ohm$^{-1}$ m$^{-1}$* or alternatively written as *mho m$^{-1}$*.",
        "category": "important",
        "badgeTitle": "PROPERTY",
        "badgeText": "Intrinsic material characteristic"
      },
      {
        "question": "According to the materials table, which two specific metallic elements are ranked as the best conductors of electricity?",
        "answer": "*Silver* and *copper* possess the lowest resistivities, making them the best conductors.",
        "category": "important",
        "badgeTitle": "COPPER RESISTIVITY",
        "badgeText": "$1.69 \\times 10^{-8} \\Omega$m"
      },
      {
        "question": "At a microscopic level, why does the electrical resistance of a metallic conductor increase as it is heated?",
        "answer": "As temperature rises, the *amplitude of vibration* of the lattice atoms increases, offering a *bigger target* which makes collisions with free electrons more frequent.",
        "category": "important",
        "badgeTitle": "RESULT",
        "badgeText": "Increased collision cross-section"
      },
      {
        "question": "What specific physical quantity is defined as the fractional change in resistance per kelvin?",
        "answer": "This is known as the *temperature coefficient of resistance*, denoted by $\\alpha$.",
        "category": "important",
        "badgeTitle": "FORMULA",
        "badgeText": "$\\alpha = \\frac{R_t - R_0}{R_0 t}$"
      },
      {
        "question": "Which specific semiconductor materials are noted for having a negative temperature coefficient of resistance?",
        "answer": "Materials like *germanium* and *silicon* exhibit decreasing resistance as their temperature increases.",
        "category": "important",
        "badgeTitle": "TABLE VALUES",
        "badgeText": "Ge ($-0.05 K^{-1}$), Si ($-0.07 K^{-1}$)"
      },
      {
        "question": "How is the power output of a battery related to the energy it supplies over time?",
        "answer": "Electrical power is the *rate* at which the battery supplies electrical energy, calculated as energy supplied divided by *time taken*.",
        "category": "important",
        "badgeTitle": "DERIVED FORMULA",
        "badgeText": "$P = VI$"
      },
      {
        "question": "What is the physical origin of the internal resistance ($r$) within a chemical cell or battery?",
        "answer": "It is the resistance offered to the current by the *electrolyte* present between the two electrodes of the cell.",
        "category": "important",
        "badgeTitle": "EQUIVALENT CIRCUIT",
        "badgeText": "Modeled as a resistor $r$ in series with pure EMF $E$"
      },
      {
        "question": "What specific voltage does a high-resistance voltmeter read when connected across a cell in an \"open circuit\" state?",
        "answer": "It reads the full *Electromotive Force (EMF)* of the cell because no current is flowing to cause an internal potential drop.",
        "category": "important",
        "badgeTitle": "FORMULA STATE",
        "badgeText": "$V = E$ (since $I = 0$)"
      },
      {
        "question": "In terms of cause and effect within a circuit, how are EMF and potential difference philosophically distinguished?",
        "answer": "The EMF is the *\"cause\"* (always present even without current), and the potential difference across a conductor is its *\"effect\"* (only present when current flows).",
        "category": "important",
        "badgeTitle": "ENERGY VIEW",
        "badgeText": "EMF supplies energy; PD dissipates it"
      },
      {
        "question": "What specific electrical term is used to describe a node whose potential is strictly taken as zero?",
        "answer": "It is referred to as a *datum node*.",
        "category": "important",
        "badgeTitle": "CIRCUIT ANALYSIS",
        "badgeText": "Reference point for potentials"
      },
      {
        "question": "What is the mandatory convention for assigning loop currents when applying Kirchhoff's Second Rule to a multi-loop circuit?",
        "answer": "All assumed loop currents must flow in the *same sense*, meaning they must be either all clockwise or all anticlockwise.",
        "category": "important",
        "badgeTitle": "ANALYSIS PROTOCOL",
        "badgeText": "Prevents sign convention errors"
      },
      {
        "question": "When traversing a resistor in the direction of the assumed current, what sign is assigned to the potential change according to Kirchhoff's rules?",
        "answer": "The potential change is considered *negative* ($-IR$) because the charge is passing from high to low potential.",
        "category": "important",
        "badgeTitle": "RULE",
        "badgeText": "Voltage drop"
      },
      {
        "question": "Why does a standard voltmeter fail to measure the exact, true potential difference across a high-resistance circuit component?",
        "answer": "A standard voltmeter has finite resistance and draws an *appreciable current*, which alters the main circuit current and the actual potential drop.",
        "category": "important",
        "badgeTitle": "IDEAL CASE",
        "badgeText": "Infinite resistance required"
      },
      {
        "question": "How does a potentiometer operate as a variable potential divider?",
        "answer": "It uses a *sliding contact (C)* along a uniform resistance wire (AB) to vary the resistance ($r$) and consequently the proportional potential drop.",
        "category": "important",
        "badgeTitle": "FORMULA",
        "badgeText": "$rI = rE/R$"
      },
      {
        "question": "In total darkness, why does a Light Dependent Resistor (LDR) exhibit extremely high electrical resistance?",
        "answer": "Because the semiconductor material lacks photon stimulation, resulting in very *few free electrons* (charge carriers) available to conduct electricity.",
        "category": "important",
        "badgeTitle": "WORKING PRINCIPLE",
        "badgeText": "Photo-conductivity"
      },
      {
        "question": "What specific semiconductor material is traditionally used to manufacture the active track of a Light Dependent Resistor (LDR)?",
        "answer": "They are typically made from deposited *cadmium sulphide*.",
        "category": "important",
        "badgeTitle": "APPLICATION",
        "badgeText": "Automatic street lighting"
      },
      {
        "question": "Why does the resistance of a standard Negative Temperature Coefficient (NTC) thermistor decrease when heated?",
        "answer": "Thermal energy provides more energy to the *charge carriers* (electrons or holes), allowing them to break free and move, thus increasing conductivity.",
        "category": "important",
        "badgeTitle": "COMPOSITION",
        "badgeText": "Baked metallic oxides"
      },
      {
        "question": "What are the three common geometric shapes in which commercial thermistors are manufactured?",
        "answer": "They are commonly pressed and baked into the shapes of *beads, rods, or washers*.",
        "category": "important",
        "badgeTitle": "MANUFACTURING",
        "badgeText": "High-pressure ceramic baking"
      },
      {
        "question": "In a thermistor-based fire alarm circuit, what specific logic gate is used to trigger the siren when the thermistor's voltage drops?",
        "answer": "A *NOT gate* is used; it turns from low to high output when the input voltage from the thermistor drops due to heat.",
        "category": "important",
        "badgeTitle": "FUNCTION",
        "badgeText": "Acts as an inverting switch"
      },
      {
        "question": "How are carbon fibers utilized to monitor the structural integrity of newly constructed concrete bridges?",
        "answer": "Carbon fibers, which are *good conductors*, are embedded into a network within the concrete; inspectors apply a current and measure the *electrical resistance* over time to detect cracks.",
        "category": "important",
        "badgeTitle": "INDICATOR",
        "badgeText": "Increasing resistance signals structural deterioration"
      },
      {
        "question": "How does an LDR assist in modern photography equipment?",
        "answer": "LDRs act as *light sensors* to help automatically adjust the *exposure time* in cameras based on the ambient light levels.",
        "category": "important",
        "badgeTitle": "FUNCTION",
        "badgeText": "Exposure control"
      },
      {
        "question": "Besides electrostatics and magnetism, what other unexpected scientific fields did Charles de Coulomb contribute to during his lifetime?",
        "answer": "His research provided fundamental understandings in the fields of *structural mechanics* and *ergonomics*.",
        "category": "conceptual",
        "badgeTitle": "HISTORICAL FACT",
        "badgeText": "He investigated the strengths of materials and the best ways people and animals can do work."
      },
      {
        "question": "Why do a person's hairs stand on end when they touch the dome of a working Van de Graaff generator?",
        "answer": "The person acquires a *net positive charge* from the dome, causing individual hairs to become similarly charged and *repel each other*.",
        "category": "conceptual",
        "badgeTitle": "APPLICATION",
        "badgeText": "Electrostatic repulsion."
      },
      {
        "question": "What is the maximum electrical potential difference that can be achieved in modern, full-scale Van de Graaff generators?",
        "answer": "Modern versions can reach a potential difference of up to *5 megavolts*.",
        "category": "conceptual",
        "badgeTitle": "TABLETOP OUTPUT",
        "badgeText": "Tabletop versions produce around 100,000 volts."
      },
      {
        "question": "Why is it physically impossible for two electric lines of force to ever cross each other?",
        "answer": "Because the electric field $E$ has *only one direction* at any given point; intersecting lines would imply two different directions for the field at a single point.",
        "category": "conceptual",
        "badgeTitle": "CORE PRINCIPLE",
        "badgeText": "Vector uniqueness."
      },
      {
        "question": "What is the exact value of the electric field intensity strictly inside the volume of a solid conductor under electrostatic equilibrium?",
        "answer": "The electric field inside the conductor remains strictly *zero*.",
        "category": "conceptual",
        "badgeTitle": "CONCEPT",
        "badgeText": "Electrostatic shielding."
      },
      {
        "question": "Why is it strongly advised to wear rubber-soled shoes while handling electric appliances?",
        "answer": "Rubber is a strong *insulator* that breaks the electrical circuit to the *ground*, preventing a fatal current from flowing through the body.",
        "category": "conceptual",
        "badgeTitle": "POINT TO PONDER",
        "badgeText": "Safety mechanism."
      },
      {
        "question": "In a medical Electrocardiogram (ECG) performed on a running patient, what specific physical quantity is being recorded?",
        "answer": "It records the *voltage* generated between points on human skin by the *electrical process in the heart* under stress.",
        "category": "conceptual",
        "badgeTitle": "BIO-ELECTRICITY",
        "badgeText": "Heart performance diagnosis."
      },
      {
        "question": "Which specific medical diagnostic technique utilizes the potential differences created by the electrical activity of the brain?",
        "answer": "*Electroencephalography (EEG)* uses these brain-generated potential differences to diagnose abnormal behavior.",
        "category": "conceptual",
        "badgeTitle": "GRAPH ANALYSIS",
        "badgeText": "Normal vs. Abnormal alpha rhythms."
      },
      {
        "question": "What is the exact mathematical shape of the trajectory of a charged particle that enters perpendicularly into a uniform electric field?",
        "answer": "Its path will be strictly *parabolic*, identical to a projectile thrown horizontally in a uniform gravitational field.",
        "category": "conceptual",
        "badgeTitle": "VELOCITY COMPONENTS",
        "badgeText": "Horizontal velocity remains constant, vertical accelerates."
      },
      {
        "question": "Why are insulating materials completely useless for constructing a functional Faraday cage?",
        "answer": "Because insulators *do not contain free electrons* that can rapidly move to the surface to cancel out the external electric fields.",
        "category": "conceptual",
        "badgeTitle": "REQUIRED PROPERTY",
        "badgeText": "Conductive material."
      },
      {
        "question": "Why are passengers inside a metal-framed car generally safe from electrocution during a severe lightning thunderstorm?",
        "answer": "The car's metal body acts as a *Faraday cage*, causing the electrical charge to travel exclusively over the *outer metal surface* and into the ground.",
        "category": "conceptual",
        "badgeTitle": "SHIELDING EXAMPLE",
        "badgeText": "Airplane frames work on the same principle."
      },
      {
        "question": "How is the fundamental flow of an electric current conceptually analogous to the flow of heat and fluid?",
        "answer": "Flow of current is driven by *potential difference*, just as heat flow is driven by *temperature difference*, and fluid flow is driven by *pressure difference*.",
        "category": "conceptual",
        "badgeTitle": "DO YOU KNOW?",
        "badgeText": "Universal flow principles."
      },
      {
        "question": "What microscopic interaction causes the transfer of kinetic energy from accelerated free electrons to the lattice of a conductor, thereby creating resistance?",
        "answer": "The free electrons keep *bumping and colliding* with the atoms of the conductor's lattice as they drift.",
        "category": "conceptual",
        "badgeTitle": "RESULTING VELOCITY",
        "badgeText": "Drift velocity."
      },
      {
        "question": "Why doesn't it take several minutes for a lightbulb to turn on, given that the electron drift velocity is extremely slow ($10^{-3}$ m/s)?",
        "answer": "Because the electric field disturbance propagates along the wire almost *instantaneously*, causing all free electrons in the entire circuit to *start drifting simultaneously*.",
        "category": "conceptual",
        "badgeTitle": "MISCONCEPTION CHECK",
        "badgeText": "Speed of signal vs. speed of electrons."
      },
      {
        "question": "In the context of complex circuit analysis, what is the precise definition of a \"node\"?",
        "answer": "A node is a specific point in an electric circuit which *joins two or more branches* together.",
        "category": "conceptual",
        "badgeTitle": "DATUM NODE",
        "badgeText": "A node whose potential is taken as strictly zero."
      },
      {
        "question": "Why is a three-pin plug used in some heavy electric appliances rather than a standard two-pin plug?",
        "answer": "The third, usually thicker pin provides an *earth or ground connection* to safely dissipate leakage currents in case of a short circuit.",
        "category": "conceptual",
        "badgeTitle": "POINT TO PONDER",
        "badgeText": "Electrical safety."
      },
      {
        "question": "In a Wheatstone Bridge or Potentiometer, why does the internal resistance of the galvanometer NOT affect the final measurement accuracy?",
        "answer": "Because at the null point, *no current is passing through it*, meaning its internal resistance does not come into play and causes no voltage drop.",
        "category": "conceptual",
        "badgeTitle": "ADVANTAGE",
        "badgeText": "Highly precise \"zero-draw\" measurement."
      },
      {
        "question": "How sensitive is a high-quality galvanometer used for detecting the null point in precision bridge circuits?",
        "answer": "They are highly sensitive and can detect very small currents on the order of *$10^{-6}$ ampere*.",
        "category": "conceptual",
        "badgeTitle": "APPLICATION ADVANTAGE",
        "badgeText": "Clear and direct balance condition."
      },
      {
        "question": "For what specific temperature range are thermistors with high negative temperature coefficients considered exceptionally accurate?",
        "answer": "They are highly accurate for measuring very *low temperatures*, especially near *10 Kelvin*.",
        "category": "conceptual",
        "badgeTitle": "REASONING",
        "badgeText": "Higher resistance at low temperatures enables accurate reading."
      },
      {
        "question": "How are thermistors utilized to protect sensitive electronic devices when they are first turned on?",
        "answer": "They are used to limit the *initial flow of current* (inrush current limiting) before the circuit reaches its steady operational state.",
        "category": "conceptual",
        "badgeTitle": "CIRCUIT ROLE",
        "badgeText": "Surge protection."
      },
      {
        "question": "In a thermistor-based automatic fire alarm, what specific digital logic gate triggers the siren when heated?",
        "answer": "A *NOT gate* turns from a low to a *high output* when the thermistor's voltage drop decreases due to heat.",
        "category": "conceptual",
        "badgeTitle": "ACTION",
        "badgeText": "Triggers the alarm siren."
      },
      {
        "question": "What physical interaction occurs within Cadmium Sulphide (an LDR material) when it is exposed to light photons?",
        "answer": "Light photons transfer energy to the *outer orbit electrons*, making them *free to conduct electricity* and drastically lowering the resistance.",
        "category": "conceptual",
        "badgeTitle": "PROPERTY",
        "badgeText": "Photo-resistivity."
      },
      {
        "question": "How do Light Dependent Resistors (LDRs) assist in the operation of modern digital and analog cameras?",
        "answer": "They act as sensors to help automatically adjust the *exposure time* based on the amount of available ambient light.",
        "category": "conceptual",
        "badgeTitle": "APPLICATION",
        "badgeText": "Exposure Control."
      },
      {
        "question": "What is the first underlying scientific reason that carbon fibers can be used to monitor the structural integrity of concrete bridges?",
        "answer": "Carbon fibers are known to be *good conductors of electricity* due to their high carbon content.",
        "category": "conceptual",
        "badgeTitle": "EMBEDDED NETWORK",
        "badgeText": "Form a conductive mesh inside the concrete."
      },
      {
        "question": "If inspectors pass a current through a carbon fiber network in a concrete bridge and notice the electrical resistance is increasing over time, what does this diagnose?",
        "answer": "It indicates that the concrete is *deteriorating* or that the carbon fibers are physically *separating because of cracks*.",
        "category": "conceptual",
        "badgeTitle": "STRUCTURAL HEALTH",
        "badgeText": "Non-destructive testing."
      },
      {
        "question": "Is the electric field necessarily zero inside a spherically charged, hollow rubber balloon?",
        "answer": "Yes, the field is *zero inside*, analogous to a hollow conducting sphere, because there is no enclosed charge within the Gaussian surface inside the balloon.",
        "category": "conceptual",
        "badgeTitle": "EXERCISE CRQ 9.2",
        "badgeText": "Application of Gauss's Law."
      },
      {
        "question": "What will be the net electric flux through a completely uncharged, hollow conducting sphere that is placed near an external positive charge $q$?",
        "answer": "The net flux through the sphere will be strictly *zero* because the total net charge enclosed within the shell remains zero.",
        "category": "conceptual",
        "badgeTitle": "EXERCISE CRQ 9.4",
        "badgeText": "Electrostatic induction causes polarization, but net charge is 0."
      },
      {
        "question": "According to the exercise questions, what is the effect on the drift velocity of free electrons if the potential difference across a wire is increased?",
        "answer": "The drift velocity will *increase* because a higher potential difference creates a stronger electric field, accelerating the electrons more forcefully.",
        "category": "conceptual",
        "badgeTitle": "FORMULA RELATION",
        "badgeText": "$v \\propto E \\propto V$."
      },
      {
        "question": "According to the exercise questions, how does decreasing the temperature of a copper wire affect the drift velocity of its free electrons?",
        "answer": "Decreasing the temperature reduces atomic vibrations (lowers resistance), causing fewer collisions, which allows the drift velocity to *increase* for a given voltage.",
        "category": "conceptual",
        "badgeTitle": "EXERCISE CRQ 9.5",
        "badgeText": "Temperature vs. Drift Velocity."
      },
      {
        "question": "Why does the terminal potential difference of a battery measurably decrease when the current drawn from it is increased?",
        "answer": "Because a larger current causes a larger potential drop ($Ir$) across the battery's own *internal resistance*, leaving less voltage ($V = E - Ir$) available at the terminals.",
        "category": "conceptual",
        "badgeTitle": "EXERCISE CRQ 9.6",
        "badgeText": "Internal resistance effect."
      },
      {
        "question": "Comparing a 500W-220V light bulb and a 100W-220V light bulb, which one has the lower filament electrical resistance?",
        "answer": "The *500W-220V* bulb has a significantly *lower* resistance.",
        "category": "conceptual",
        "badgeTitle": "POWER FORMULA",
        "badgeText": "$P = V^2 / R$, so higher power dictates lower resistance at a constant voltage."
      },
      {
        "question": "Why must the electric field just outside the surface of a charged conductor in equilibrium be exactly perpendicular to the surface?",
        "answer": "If it were not perpendicular, the *parallel component* would exert a force on free electrons, causing them to move, which violates the strict condition of *electrostatic equilibrium*.",
        "category": "conceptual",
        "badgeTitle": "CONCEPT",
        "badgeText": "Conductor surface properties."
      },
      {
        "question": "How does a thermistor behave differently from a standard metallic conductor when its physical temperature is increased?",
        "answer": "Unlike metals whose resistance increases with heat, a standard thermistor has a *negative temperature coefficient*, meaning its resistance *decreases* as it gets hotter.",
        "category": "conceptual",
        "badgeTitle": "REASONING",
        "badgeText": "Heat liberates more charge carriers in the semiconductor ceramic."
      },
      {
        "question": "Under what specific extreme physical conditions are the semiconductor ceramic mixtures baked during the manufacturing of commercial thermistors?",
        "answer": "They are created by heating the mixtures under *high pressure* and then baked at very *high temperatures*.",
        "category": "conceptual",
        "badgeTitle": "MATERIALS",
        "badgeText": "Oxides of manganese, nickel, cobalt, copper, iron."
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
