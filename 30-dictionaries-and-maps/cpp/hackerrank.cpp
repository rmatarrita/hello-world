#include <iostream>
#include <fstream>
#include <vector>
#include <map>
#include <string>
#include <ctype.h>

using namespace std;

int main()
{
    //ofstream fout(getenv("OUTPUT_PATH"));

    std::map<string, string> phoneBook;
    string line;
    string name;
    string number;
    std::getline(std::cin, line);
    int n = stoi(line);
    for (int i = 0; i < n; i++) {
        std::getline(std::cin, name, ' ');
        std::getline(std::cin, number);
        phoneBook.insert(std::pair<string,string>(name,number));
    }

    while (std::getline(std::cin, line))
    {
        std::map<string,string>::const_iterator it = phoneBook.find(line);
        if (it == phoneBook.end()) {
            cout << "Not found\n";
        }
        else
        {
            cout << it->first << "=" << it->second << "\n";
        }
    }
    //fout.close();

    return 0;
}
