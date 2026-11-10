export const examples = [
  {
    id: "hello",
    tab: "Hello, world",
    file: "hello.mam",
    code: `fun greet(name: Text) {
    print("Hello, {name}!")
}

for name in ["Maya", "Sam"] {
    greet(name)
}`,
    outputLabel: "Expected output",
    output: "Hello, Maya!\nHello, Sam!",
    note: "Functions, lists, loops, and string interpolation. A small program you can read from top to bottom.",
  },
  {
    id: "functions",
    tab: "Functions",
    file: "functions.mam",
    code: `fun priceAfterDiscount(price: Int, percent: Int = 10): Int {
    return price - price * percent / 100
}

let regular = priceAfterDiscount(200)
let special = priceAfterDiscount(200, percent = 25)

print("Regular offer: {regular}")
print("Special offer: {special}")`,
    outputLabel: "Expected output",
    output: "Regular offer: 180\nSpecial offer: 150",
    note: "Explicit parameter and return types, inferred local values, default arguments, and named arguments—all in one small function.",
  },
  {
    id: "collections",
    tab: "Collections",
    file: "collections.mam",
    code: `let scores = [48, 92, 75, 63, 88]

let passed = scores
    .filter { it >= 70 }
    .sorted()
let labels = passed.map { "{it} points" }

print(labels.joinToString(", "))
print("Highest: {passed.last()}")`,
    outputLabel: "Expected output",
    output: "75 points, 88 points, 92 points\nHighest: 92",
    note: "Filter, sort, and transform a collection with lambdas. The pipeline keeps the steps close to the idea they express.",
  },
  {
    id: "nulls",
    tab: "Null safety",
    file: "null-safety.mam",
    code: `fun displayName(name: Text?): Text {
    return name?.trim()?.uppercase() ?: "GUEST"
}

print(displayName("  Maya  "))
print(displayName(null))`,
    outputLabel: "Expected output",
    output: "MAYA\nGUEST",
    note: "Text? makes a missing value explicit. Safe calls skip null values; the Elvis operator supplies a fallback.",
  },
  {
    id: "classes",
    tab: "Classes",
    file: "classes.mam",
    code: `interface Animal {
    fun speak(): Text
}

class Mammoth(let name: Text) implements Animal {
    override fun speak(): Text {
        return "{name} says hello!"
    }
}

let friend: Animal = Mammoth("Momo")
print(friend.speak())`,
    outputLabel: "Expected output",
    output: "Momo says hello!",
    note: "Define a contract with an interface, give it a class implementation, and call through the shared type.",
  },
  {
    id: "branching",
    tab: "Branching",
    file: "branching.mam",
    code: `fun describe(score: Int): Text {
    return when score {
        in 90..100 -> "Excellent"
        in 70..89 -> "Passed"
        else -> "Keep going"
    }
}

for score in [95, 78, 52] {
    print("{score}: {describe(score)}")
}`,
    outputLabel: "Expected output",
    output: "95: Excellent\n78: Passed\n52: Keep going",
    note: "A when expression returns a value. Match ranges and keep the fallback visible, without a chain of nested conditions.",
  },
  {
    id: "java",
    tab: "Java interop",
    file: "java.mam",
    code: `import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.Locale

let release = LocalDate.of(2026, 11, 10)
let nextWeek = release.plusDays(7)
let format = DateTimeFormatter.ofPattern("dd MMM uuuu", Locale.ENGLISH)

print(release.format(format))
print("Next week: {nextWeek}")`,
    outputLabel: "Expected output",
    output: "10 Nov 2026\nNext week: 2026-11-17",
    note: "Use real JDK classes and their methods directly. Dates, formatting, and the explicit English locale all come from Java’s standard library.",
  },
  {
    id: "json",
    tab: "JSON",
    file: "json.mam",
    code: `import mammoth.Json

let project = {"name": "Mammoth", "target": "JVM"}
let text = Json.stringify(project)
let decoded = Json.parse(text)

print(decoded["name"].asText())
print(decoded["target"].asText())
print(decoded.find("version") == null)`,
    outputLabel: "Expected output",
    output: "Mammoth\nJVM\ntrue",
    note: "Dictionary literals meet the bundled JSON library. Encode a map, decode it, read typed values, and check for a missing key. No network call needed.",
  },
];
